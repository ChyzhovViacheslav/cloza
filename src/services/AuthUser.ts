import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface IRegisterUser {
    username: string,
    password: string,
    email: string
    registerDate: string
}

interface ILoginUser {
    email: string,
    password: string
}

export const authUser = createApi({
    reducerPath: 'authUser',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://cloza-api.vercel.app/authUser'
    }),
    endpoints: (build) => ({
        fetchAllUsers: build.query({
            query: ({page, limit, params}) => ({
                url: `/users?page=${page}&limit=${limit}`,
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
            query: (email) => `/user/?email=${email}`
        }),
        fetchOneUserById: build.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET'
            })
        }),
        changeUserInfo: build.mutation({
            query: ({id, body}) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body
            })
        })
    })
})