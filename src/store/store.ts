import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter-slice";
import gameSlice from "./slices/game-slice";
import routerSlice from "./slices/router-slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    game: gameSlice,
    router: routerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
