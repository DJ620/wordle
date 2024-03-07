import { createSlice } from "@reduxjs/toolkit";

const versionSlice = createSlice({
    name: "version",
    initialState: "classic",
    reducers: {
        setVersion: (state, action) => {
            return state = action.payload;
        }
    }
});

export const { setVersion } = versionSlice.actions;

export default versionSlice.reducer;