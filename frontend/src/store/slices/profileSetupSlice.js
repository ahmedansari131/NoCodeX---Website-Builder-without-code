import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}

const profileSetup = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.status = true;
        },
    }
});

export default profileSetup.reducer;
export const {setProfile} = profileSetup.actions;
