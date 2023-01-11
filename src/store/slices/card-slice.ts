import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DeckType, initialCardState } from "../interfaces";

export const cardSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialCardState,
  reducers: {
    mix(state, action: PayloadAction<DeckType>) {
      if (action.payload === DeckType.enemies) {
        state.enemies.J = state.enemies.J.sort(() => Math.random() - 0.5);
        state.enemies.Q = state.enemies.Q.sort(() => Math.random() - 0.5);
        state.enemies.K = state.enemies.K.sort(() => Math.random() - 0.5);
        return;
      }
      state[action.payload] = state[action.payload].sort(
        () => Math.random() - 0.5
      );
    },
  },
});

export const { mix } = cardSlice.actions;

export default cardSlice.reducer;
