import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../jwt/token';

export const authApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/auth/api/" }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/register/',
                method: "POST",
                body: userData,
            }),
        }),

        verifyEmail: builder.mutation({
            query: (code) => ({
                url: '/verify-otp/',
                method: "POST",
                body: code,
            }),
        }),

        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/login/',
                method: "POST",
                body: userData,
            }),
        }),

        ProfileSetup: builder.mutation({
            query: (userData) => ({
                url: '/user-profile-setup/',
                method: "POST",
                body: userData,
                headers: {
                    "Authorization": `Bearer ${getToken()['access']}`
                }
            }),
        }),

        ProfileUpdate: builder.mutation({
            query: (userData) => {
                const id = userData.get("id");
                return {
                    url: `/user-profile-setup/${id}`,
                    method: "PUT",
                    body: userData,
                    headers: {
                        "Authorization": `Bearer ${getToken()['access']}`
                    }
                }
            },
        }),

        RefreshToken: builder.mutation({
            query: (token) => {
                return {
                    url: `/refresh-token/`,
                    method: "POST",
                    body: token,
                    // headers: {
                    //     "Authorization": `Bearer ${getToken()['access']}`
                    // }
                }
            },
        }),



    }),

})

export const { useLoginUserMutation, useRegisterUserMutation, useVerifyEmailMutation, useProfileSetupMutation, useProfileUpdateMutation, useRefreshTokenMutation } = authApi;