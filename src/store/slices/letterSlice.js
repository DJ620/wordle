import { createSlice } from "@reduxjs/toolkit";

const guessedLettersSlice = createSlice({
    name: 'guessedLetters',
    initialState: [],
    reducers: {
        addGuessedLetters: (state, action) => {
            return state = action.payload;
        },
        resetGuessedLetters: (state, action) => {
            return state = [];
        }
    }
});

export const { addGuessedLetters, resetGuessedLetters } = guessedLettersSlice.actions;

export default guessedLettersSlice.reducer;