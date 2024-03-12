import { createSlice } from "@reduxjs/toolkit";

const streakSlice = createSlice({
    name: "streak",
    initialState: 0,
    reducers: {
        setStreak: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { setStreak } = streakSlice.actions;

export default streakSlice.reducer;