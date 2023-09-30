import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
                url: '/token/',
                method: "POST",
                body: userData,
            }),
        }),
    }),

})

export const { useLoginUserMutation, useRegisterUserMutation, useVerifyEmailMutation } = authApi;