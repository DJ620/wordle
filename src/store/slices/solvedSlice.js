import { createSlice } from "@reduxjs/toolkit";

const solvedSlice = createSlice({
    name: "solved",
    initialState: false,
    reducers: {
        reduxSolved: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { reduxSolved } = solvedSlice.actions;

export default solvedSlice.reducer;
