import {
  combineReducers,
  configureStore,
  type Reducer,
} from '@reduxjs/toolkit';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './slices/userSlice';

// Persist only `state.user.user`
const userTransform = createTransform(
  // Save only `user`
  (inboundState: any) => ({ user: inboundState.user }),
  // Rehydrate by merging `user` back, leaving isLoading/error reset
  (outboundState: any) => ({
    user: outboundState.user,
    isLoading: false,
    error: null,
  }),
  { whitelist: ['user'] },
);

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  transforms: [userTransform],
};

const rootReducer = combineReducers({
  user,
});
// Create persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as Reducer<ReturnType<typeof rootReducer>>,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable check
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
      },
    }),
});

// Export persistor for PersistGate
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
