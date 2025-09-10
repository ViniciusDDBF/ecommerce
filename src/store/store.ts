// store/configureStore.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import counter from './slices/counterSlice';
import modal from './slices/modal';
import user from './slices/userSlice';
import { combineReducers } from '@reduxjs/toolkit';

// Persist configuration
const persistConfig = {
  key: 'root', // Storage key for localStorage
  storage, // Use localStorage (or import sessionStorage for session-only persistence)
  whitelist: ['user'], // Persist only the user slice
};

const rootReducer = combineReducers({
  user,
  counter,
  modal,
});
// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

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
