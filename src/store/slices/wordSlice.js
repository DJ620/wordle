import { createSlice } from "@reduxjs/toolkit";

const wordSlice = createSlice({
    name: "word",
    initialState: "",
    reducers: {
        addWord: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { addWord } = wordSlice.actions;

export default wordSlice.reducer;