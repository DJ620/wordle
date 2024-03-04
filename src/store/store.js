import { configureStore } from '@reduxjs/toolkit';
import guessedLettersReducer from "./slices/letterSlice";

const store = configureStore({
    reducer: {
        guessedLetters: guessedLettersReducer
    }
});

export default store;