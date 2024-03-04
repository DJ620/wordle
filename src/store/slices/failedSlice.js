import { createSlice } from "@reduxjs/toolkit";

const failedSlice = createSlice({
    name: "solved",
    initialState: false,
    reducers: {
        reduxfailed: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { reduxfailed } = failedSlice.actions;

export default failedSlice.reducer;