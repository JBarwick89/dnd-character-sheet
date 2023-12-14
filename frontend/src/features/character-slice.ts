import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types';

interface CharacterState extends Character {}

const initialState: CharacterState = {
  name: '',
  playerName: '',
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacterProperty(state, action: PayloadAction<{propertyName: string, value: string}>) {
      state[action.payload.propertyName as keyof CharacterState] = action.payload.value;
    },

    clearCharacter(state) {
      return initialState;
    },
  },
});

export const { 
  setCharacterProperty,
  clearCharacter,
} = characterSlice.actions;

export default characterSlice.reducer;
