import { createSlice } from "@reduxjs/toolkit";

const failedSlice = createSlice({
    name: "solved",
    initialState: false,
    reducers: {
        setFailed: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { setFailed } = failedSlice.actions;

export default failedSlice.reducer;