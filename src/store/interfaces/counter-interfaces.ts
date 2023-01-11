// Define a type for the slice state
export interface CounterState {
  value: number;
}

// Define the initial state using that type
export const initialState: CounterState = {
  value: 0,
};
