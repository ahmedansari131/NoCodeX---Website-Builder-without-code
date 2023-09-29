import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import authSlice from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});