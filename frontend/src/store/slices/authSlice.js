import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        login: (state, actions) => {
            state.status = true;
            state.userData = actions.payload.userData;
        },

        logout: (state, actions) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export default authSlice.reducer;
export const {login, logout} = authSlice.actions;