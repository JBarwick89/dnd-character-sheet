import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './features/character-slice';

export const store = configureStore({
  reducer: {
    character: characterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;
