import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialState } from "../interfaces";
import {
  initialRouterState,
  PosibleRoute,
} from "../interfaces/route-interfaces";

export const routerSlice = createSlice({
  name: "router",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialRouterState,
  reducers: {
    changeTo(state, action: PayloadAction<PosibleRoute>) {
      state.location.pathname = action.payload;
      state.history.splice(
        state.historyPosition + 1,
        state.history.length - state.historyPosition - 1,
        action.payload
      );
      state.historyPosition++;
    },
    back(state) {
      if (state.historyPosition > 0) {
        state.historyPosition--;
        state.location.pathname = state.history[state.historyPosition];
      }
    },
    forward(state) {
      if (state.historyPosition < state.history.length - 1) {
        state.historyPosition++;
        state.location.pathname = state.history[state.historyPosition];
      }
    },
    setSearch(state, action: PayloadAction<string>) {
      state.location.search = action.payload;
    },
    setHash(state, action: PayloadAction<string>) {
      state.location.hash = action.payload;
    },
  },
});

export const { changeTo, back, forward, setHash, setSearch } =
  routerSlice.actions;

export default routerSlice.reducer;
