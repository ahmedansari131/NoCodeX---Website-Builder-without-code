import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/index";
import authSlice from "./slices/authSlice";
import profileSetup from "./slices/profileSetupSlice";
import { profileSlice, registrationSlice } from "./slices/index";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice,
        registration: registrationSlice,
        profile: profileSetup,
        userProfile: profileSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});