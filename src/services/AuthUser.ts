import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface IUser {
    email: string,
    userName: string,
    _id: string
}

export const authUser = createApi({
    reducerPath: 'authUser',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/authUser/'
    }),
    endpoints: (build) => ({
        fetchAllUsers: build.query({
            query: () => 'users'
        }),
        registerUser: build.mutation<IUser, IUser>({
            query: (body) => ({
                url: 'registration',
                method: 'POST',
                body
            })
        }),
        loginUser: build.mutation<IUser, IUser>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body
            })
        })
    })
})