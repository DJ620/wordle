import { configureStore } from '@reduxjs/toolkit';
import guessedLettersReducer from "./slices/letterSlice";
import wordReducer from "./slices/wordSlice";
import solvedReducer from "./slices/solvedSlice";
import failedReducer from './slices/failedSlice';

const store = configureStore({
    reducer: {
        guessedLetters: guessedLettersReducer,
        word: wordReducer,
        solved: solvedReducer,
        failed: failedReducer
    }
});

export default store;