import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DeckType, initialGameState } from "../interfaces";
import {
  mixEnemies,
  mix,
  stole,
  cure,
  incrementStage,
  asignEnemy,
  superCard,
  cIHI,
} from "../helpers";
import { Toasts } from "../../components/ui/Toasts";
import { CardType, HA, Suit } from "../interfaces/game-interfaces";

export const gameSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialGameState,
  reducers: {
    mixDeck(state, action: PayloadAction<DeckType>) {
      state[action.payload] = mix(state[action.payload]);
    },
    mixEnemiesDeck(state) {
      state.enemies = mixEnemies(state.enemies);
    },
    setPlayers(state, action: PayloadAction<number>) {
      state.players = action.payload;
      state.multiple = state.players > 1;
      state.maxHand = 9 - state.players;
    },
    startGame(state, action: PayloadAction<number>) {
      state.started = true;
      state.players = action.payload;
      state.multiple = state.players > 1;
      state.maxHand = 9 - state.players;
      state.enemies = mixEnemies(state.enemies);
      state.enemy = asignEnemy(state.enemies);
      state.deck = mix(state.deck);
      state.hand = state.deck.splice(0, state.maxHand);
    },
    restartGame(state) {
      state = initialGameState;
    },
    cleanError(state) {
      state.error = null;
    },
    toggleSelectCard(state, action: PayloadAction<number>) {
      const { payload: pos } = action;
      const toggle = () => (state.hand[pos].select = !state.hand[pos].select);
      // si no hay ninguna seleccionada, selecciona la carta
      if (!state.hand.some((c) => c.select) || state.stages === 4) toggle();
      // si hay una seleccionada y es la misma, la deselecciona
      else if (state.hand[pos].select) toggle();
      else if (state.hand.findIndex((c) => c.select) === pos) toggle();
      // si, tanto la seleccionada como alguna que este seleccionada, son A, las permite seleccionar hasta 2
      else if (
        (state.hand[pos].name === "A" ||
          state.hand.find((c) => c.select)?.name === CardType.A) &&
        state.hand.filter((c) => c.select).length === 1
      )
        toggle();
      // si, tanto la seleccionada como alguna que este seleccionada, son iguales, las permite seleccionar
      // mientras la suma de la scartas sea menor o igual a 10
      else if (state.hand[pos].name === state.hand.find((c) => c.select)?.name)
        if (
          (state.hand.filter((c) => c.select).length + 1) *
            state.hand[pos].value <=
          10
        )
          toggle();
        // sino, deshabilita todas las cartas excepto las seleccionadas
        else
          state.hand = state.hand.map((c) => ({
            ...c,
            disacled: (c.disabled = !c.select),
          }));
    },
    attack(state) {
      const cards = state.hand.filter((c) => c.select);
      state.field = [...state.field, ...cards];
      state.hand = state.hand.filter((c) => !c.select);
      state.stages = incrementStage(state.stages);
      state.history.unshift(cIHI(HA.play, [cards.length]));
    },
    applyEffects(state) {
      const enemy = state.enemy;
      const sCard = superCard(state.field, state.enemy);
      state.field = state.field.map((f) => ({ ...f, used: true }));
      state.attackResume = sCard;
      if (enemy)
        sCard.suits.forEach((s) => {
          switch (s) {
            case Suit.spades:
              if (enemy.suit === Suit.spades) {
                state.history.unshift(cIHI(HA.b_spades));
                break;
              }
              const res = enemy.tempAttack - sCard.attack;
              state.enemy = {
                ...enemy,
                tempAttack: res >= 0 ? res : 0,
              };
              state.history.unshift(cIHI(HA.spades, [sCard.attack]));
              break;

            case Suit.diamonds:
              if (enemy.suit === Suit.diamonds) {
                state.history.unshift(cIHI(HA.b_diamonds));
                break;
              }
              const cant = state.maxHand - state.hand.length;
              state.hand = stole(
                state.deck,
                state.hand,
                state.maxHand,
                sCard.attack
              );
              const d = cant <= sCard.attack ? cant : sCard.attack;
              state.history.unshift(cIHI(HA.diamonds, [d]));
              break;

            case Suit.hearts:
              if (enemy.suit === Suit.hearts) {
                state.history.unshift(cIHI(HA.b_hearts));
                break;
              }
              const length = state.discard.length;
              state.deck = cure(state.discard, state.deck, sCard.attack);
              const h = length <= sCard.attack ? length : sCard.attack;
              state.history.unshift(cIHI(HA.hearts, [h]));
              break;

            case Suit.clubs:
              if (enemy.suit === Suit.clubs) {
                state.history.unshift(cIHI(HA.b_clubs));
                break;
              }
              state.history.unshift(cIHI(HA.clubs, [sCard.attack]));

            default:
              break;
          }
        });
      state.stages = incrementStage(state.stages);
    },
    makeDamage(state) {
      if (state.enemy)
        state.enemy = {
          ...state.enemy,
          tempHp: state.enemy.tempHp - (state.attackResume?.attack || 0),
        };
      state.stages = incrementStage(state.stages);
      const m = state.attackResume?.attack || 0;
      state.history.unshift(cIHI(HA.attack, [m]));
    },
    receiveDamage(state) {
      if (state.enemy) {
        if (state.enemy.tempHp > 0) {
          const selected = state.hand.filter((c) => c.select);
          const totalDefense = selected.reduce((acc, c) => acc + c.value, 0);
          if (totalDefense < state.enemy.tempAttack) {
            Toasts.warning(
              `Debes seleccionar suficientes cartas para defenderte. Total a defender: ${state.enemy.tempAttack}`
            );
            return;
          }
          state.discard.push(...selected);
          state.hand = state.hand.filter((c) => !c.select);
          state.history.unshift(
            cIHI(HA.defense, [selected.length, totalDefense])
          );
        } else {
          if (state.enemy.tempHp === 0) {
            const { tempAttack, tempHp, ...enemy } = state.enemy;
            state.deck.unshift(enemy);
          } else if (state.enemy.tempHp < 0) {
            const { tempAttack, tempHp, ...enemy } = state.enemy;
            state.discard.unshift(enemy);
          }
          state.discard.push(...state.field);
          state.field = [];
          state.enemy = asignEnemy(state.enemies);
        }
        state.stages = incrementStage(state.stages);
      }
    },
  },
});

export const {
  mixDeck,
  mixEnemiesDeck,
  setPlayers,
  toggleSelectCard,
  startGame,
  restartGame,
  attack,
  applyEffects,
  makeDamage,
  receiveDamage,
} = gameSlice.actions;

export default gameSlice.reducer;
