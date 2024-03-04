import { createSlice } from "@reduxjs/toolkit";

const guessedLettersSlice = createSlice({
    name: 'guessedLetters',
    initialState: [],
    reducers: {
        addGuessedLetters: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { addGuessedLetters } = guessedLettersSlice.actions;

export default guessedLettersSlice.reducer;