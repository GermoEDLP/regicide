import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DeckType, initialGameState } from "../interfaces";
import {
  mixEnemies,
  mix,
  stole,
  cure,
  calculateAttack,
  incrementStage,
  asignEnemy,
  createHistoryItem,
  ActionIcon,
} from "../helpers";
import { Toasts } from "../../components/ui/Toasts";
import { CardType, HistoryAction, Suit } from "../interfaces/game-interfaces";

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
      if (state.players > 1) {
        state.multiple = true;
      }
      state.maxHand = 9 - state.players;
    },
    startGame(state, action: PayloadAction<number>) {
      state.started = true;
      state.players = action.payload;
      if (state.players > 1) {
        state.multiple = true;
      }
      state.maxHand = 9 - state.players;
      state.enemies = mixEnemies(state.enemies);
      state.enemy = asignEnemy(state.enemies);
      state.deck = mix(state.deck);
      state.hand = state.deck.splice(0, state.maxHand);
    },
    restartGame(state) {
      state = initialGameState;
    },
    incrementRound(state) {
      state.round += 1;
    },
    stoleCardsFromDeck(state, action: PayloadAction<number>) {
      state.hand = stole(state.deck, state.hand, state.maxHand, action.payload);
    },
    discardCard(
      state,
      action: PayloadAction<{
        deck: DeckType;
        cant: number;
        index: number;
      }>
    ) {
      if (state[action.payload.deck].length < action.payload.cant) {
        state.error = {
          message: "Not enough cards in deck",
          code: 1,
        };
        return;
      }
      const card = state[action.payload.deck].splice(
        action.payload.index,
        action.payload.cant
      );
      state.discard.unshift(card[0]);
    },
    cleanError(state) {
      state.error = null;
    },
    toggleSelectCard(
      state,
      action: PayloadAction<{ pos: number; stages: number }>
    ) {
      const {
        payload: { pos, stages },
      } = action;
      const toggle = () => (state.hand[pos].select = !state.hand[pos].select);
      // si no hay ninguna seleccionada, selecciona la carta
      if (!state.hand.some((c) => c.select) || stages === 4) toggle();
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
      state.history.unshift(
        createHistoryItem(`Juega ${cards.length} cartas`, HistoryAction.play)
      );
    },
    applyEffects(state) {
      const enemy = state.enemy;
      const attackData = calculateAttack(state.field);
      state.field = state.field.map((f) => ({ ...f, used: true }));
      state.attackResume = attackData;
      attackData.cards.forEach((c) => {
        if (enemy)
          attackData.suits.forEach((s) => {
            switch (s) {
              case Suit.spades:
                const res = enemy.tempAttack - attackData.attack;
                state.enemy = {
                  ...enemy,
                  tempAttack: res >= 0 ? res : 0,
                };
                Toasts.info(`Se reduce en ${c.value} el ataque del enemigo`);
                break;
              case Suit.diamonds:
                const cant = state.maxHand - state.hand.length;
                state.hand = stole(
                  state.deck,
                  state.hand,
                  state.maxHand,
                  c.value
                );
                Toasts.info(
                  `Se roban ${cant <= c.value ? cant : c.value} cartas`
                );
                break;
              case Suit.hearts:
                const heal = state.discard.length - c.value;
                state.deck = cure(state.discard, state.deck, c.value);
                Toasts.info(
                  `Se curan ${heal <= c.value ? heal : c.value} puntos`
                );
              default:
                break;
            }
          });
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
      state.history.unshift(
        createHistoryItem(
          `${state.attackResume?.attack || 0} de daño`,
          HistoryAction.attack
        )
      );
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
            createHistoryItem(
              `Descarta ${selected.length} cartas: ${totalDefense} de defensa`,
              HistoryAction.defend
            )
          );
        } else {
          if (state.enemy.tempHp === 0) {
            const { tempAttack, tempHp, ...enemy } = state.enemy;
            state.discard.unshift(enemy);
          } else if (state.enemy.tempHp < 0) {
            const { tempAttack, tempHp, ...enemy } = state.enemy;
            state.deck.unshift(enemy);
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
  discardCard,
  incrementRound,
  mixEnemiesDeck,
  setPlayers,
  stoleCardsFromDeck,
  toggleSelectCard,
  startGame,
  restartGame,
  attack,
  applyEffects,
  makeDamage,
  receiveDamage,
} = gameSlice.actions;

export default gameSlice.reducer;
