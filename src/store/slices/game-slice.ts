import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DeckType, initialGameState } from "../interfaces";

export const gameSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialGameState,
  reducers: {
    mixDeck(state, action: PayloadAction<DeckType>) {
      state[action.payload] = state[action.payload].sort(
        () => Math.random() - 0.5
      );
    },
    mixEnemiesDeck(state) {
      state.enemies.J = state.enemies.J.sort(() => Math.random() - 0.5);
      state.enemies.Q = state.enemies.Q.sort(() => Math.random() - 0.5);
      state.enemies.K = state.enemies.K.sort(() => Math.random() - 0.5);
    },
    setPlayers(state, action: PayloadAction<number>) {
      state.players = action.payload;
      if (state.players > 1) {
        state.multiple = true;
      }
      state.maxHand = 9 - state.players;
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
      state.hand = [...state.discard, ...cards];
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
  },
});

export const { mixDeck } = gameSlice.actions;

export default gameSlice.reducer;
