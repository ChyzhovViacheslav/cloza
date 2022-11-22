import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface IRegisterUser {
    username: string,
    password: string,
    email: string,
    votes: number,
    rating: any
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
            query: ({page, limit, sortByRating, params}) => ({
                url: `/users?page=${page}&limit=${limit}&rating=${sortByRating}`,
                method: 'GET',
                params
            })
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
        }),
        fetchOneUser: build.query({
            query: ({email}:any) => `/user${email ? `?email=${email}` : ''}`
        })
    })
})