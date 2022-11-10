import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface IRegisterUser {
    username: string,
    password: string,
    email: string
}

interface ILoginUser {
    email: string,
    password: string
}

export const authUser = createApi({
    reducerPath: 'authUser',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/authUser'
    }),
    endpoints: (build) => ({
        fetchAllUsers: build.query({
            query: () => '/users'
        }),
        registerUser: build.mutation<IRegisterUser, IRegisterUser>({
            query: (body) => ({
                url: '/registration',
                method: 'POST',
                body
            })
        }),
        loginUser: build.mutation<ILoginUser, ILoginUser>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        })
    })
})