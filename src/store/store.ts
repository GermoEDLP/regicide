import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter-slice";
import cardSlice from "./slices/card-slice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    cards: cardSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
