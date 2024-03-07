import { createSlice } from "@reduxjs/toolkit";

const guessConfigSlice = createSlice({
    name: "guessConfig",
    initialState: {
        numberOfGuesses: 6,
        numberOfLetters: 5
    },
    reducers: {
        setNumberOfGuesses: (state, action) => {
            state.numberOfGuesses = action.payload;
            return state;
        },
        setNumberOfLetters: (state, action) => {
            state.numberOfLetters = action.payload;
            return state;
        }
    }
});

export const { setNumberOfGuesses, setNumberOfLetters } = guessConfigSlice.actions;

export default guessConfigSlice.reducer;