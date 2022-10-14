import { createApi, fakeBaseQuery, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'
import useAuth from '../hooks/userAuth'

interface IUser {
    email: string,
    userName: string,
    id: string
}

interface IItem {
    id: number
    name: string,
    type: string,
    user: string,
    category: string,
    string: string,
    main_color: string,
    price: number,
    brand: string,
    verified_saler?: boolean,
    condition: string,
    size: string,
    photo?: string,
    sale: number
}

export const postApi = createApi({
    reducerPath: 'postApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], IUser>({
            query: () => '/users',
            providesTags: (result) => ['Users']
        }),
        addUser: build.mutation<IUser, IUser>({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Users']
        }),
        fetchAllItem: build.query({
            query: () => ({
                url: `/items`
            })
        })
    })
})