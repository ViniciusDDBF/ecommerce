import type { UserSlice } from '@/types';
import {
  combineReducers,
  configureStore,
  type Reducer,
} from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './slices/userSlice';

const userTransform = createTransform<UserSlice, UserSlice>(
  (inboundState) => ({
    user: inboundState.user,
    isLoading: false,
    error: null,
  }),

  (outboundState) => ({
    user: outboundState.user,
    isLoading: false,
    error: null,
  }),

  { whitelist: ['user'] },
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [userTransform],
};

const rootReducer = combineReducers({
  user,
});
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as Reducer<ReturnType<typeof rootReducer>>,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
