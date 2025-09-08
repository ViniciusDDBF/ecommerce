// store/configureStore.ts
import { configureStore } from '@reduxjs/toolkit';
import logger from './middleware/logger';
import counter from './slices/counterSlice';
import modal from './slices/modal';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: {
    modal,
    counter,
    user,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
