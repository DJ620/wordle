import { createSlice } from "@reduxjs/toolkit";

const solvedSlice = createSlice({
    name: "solved",
    initialState: false,
    reducers: {
        setSolved: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { setSolved } = solvedSlice.actions;

export default solvedSlice.reducer;
