import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setRegistered: (state, actions) => {
            state.status = true
        }
    }
});

export default registrationSlice.reducer;
export const { setRegistered } = registrationSlice.actions;