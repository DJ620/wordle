import { configureStore } from '@reduxjs/toolkit';
import guessedLettersReducer from "./slices/letterSlice";
import wordReducer from "./slices/wordSlice";
import solvedReducer from "./slices/solvedSlice";
import failedReducer from './slices/failedSlice';
import versionReducer from './slices/versionSlice';
import guessConfigReducer from "./slices/guessConfigSlice";
import streakReducer from "./slices/streakSlice";

const store = configureStore({
    reducer: {
        guessedLetters: guessedLettersReducer,
        word: wordReducer,
        solved: solvedReducer,
        failed: failedReducer,
        version: versionReducer,
        guessConfig: guessConfigReducer,
        streak: streakReducer
    }
});

export default store;