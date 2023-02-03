import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DeckType, initialGameState } from "../interfaces";
import { mixEnemies, mix } from "../helpers";

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
      state.enemy = state.enemies.J.splice(0, 1)[0];
      state.deck = mix(state.deck);
      state.hand = state.deck.splice(0, state.maxHand);
    },
    restartGame(state) {
      state = initialGameState;
    },
    incrementRound(state) {
      state.round += 1;
    },
    incrementStage(state) {
      state.stages = state.stages === 4 ? 1 : state.stages + 1;
    },
    stoleCardsFromDeck(state, action: PayloadAction<number>) {
      if (state.deck.length < action.payload) {
        state.error = {
          message: "Not enough cards in deck",
          code: 1,
        };
        return;
      }
      const cards = state.deck.splice(
        0,
        action.payload + state.hand.length > state.maxHand
          ? state.maxHand - state.hand.length
          : action.payload
      );
      state.hand = [...state.hand, ...cards];
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
    toggleSelectCard(state, action: PayloadAction<number>) {
      const { payload: pos } = action;
      const toggle = () => (state.hand[pos].select = !state.hand[pos].select);
      // si no hay ninguna seleccionada, selecciona la carta
      if (!state.hand.some((c) => c.select)) toggle();
      // si hay una seleccionada y es la misma, la deselecciona
      else if (state.hand[pos].select) toggle();
      else if (state.hand.findIndex((c) => c.select) === pos) toggle();
      // si, tanto la seleccionada como alguna que este seleccionada, son A, las permite seleccionar hasta 2
      else if (
        (state.hand[pos].name === "A" ||
          state.hand.find((c) => c.select)?.name === "A") &&
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
      state.field = state.hand.filter((c) => c.select);
      state.hand = state.hand.filter((c) => !c.select);
      state.stages = 2;
    }
  },
});

export const {
  mixDeck,
  discardCard,
  incrementRound,
  incrementStage,
  mixEnemiesDeck,
  setPlayers,
  stoleCardsFromDeck,
  toggleSelectCard,
  startGame,
  restartGame,
  attack
} = gameSlice.actions;

export default gameSlice.reducer;
