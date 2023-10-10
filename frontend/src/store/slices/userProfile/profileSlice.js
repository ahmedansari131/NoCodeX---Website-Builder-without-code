import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProfile: null,
}

const profileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        setUserProfile: (state, actions) => {
            state.userProfile = actions.payload;
        },
    }
})

export default profileSlice.reducer;
export const {setUserProfile} = profileSlice.actions;