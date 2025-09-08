import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Type
interface CounterState {
  value: number;
  isLoading: boolean;
}

// Initial state
const initialState: CounterState = {
  value: 0,
  isLoading: false,
};

// Async thunk
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync', // Action type
  async (amount: number) => {
    // Fake async: Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount; // Payload to fulfill
  }
);

// createSlice makes reducer + actions easy
const counterSlice = createSlice({
  name: 'counter', // Prefix for action types
  initialState,
  reducers: {
    // Each key is an action
    increment: (state) => {
      state.value += 1; // Toolkit allows mutating state (it's safe internally)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Action with payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.value += action.payload;
        }
      )
      .addCase(incrementAsync.rejected, (state) => {
        state.value = state.value;
      });
  },
});

// Export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
