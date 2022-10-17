import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface IUser {
    email: string,
    userName: string,
    id: string
}

interface IProduct {
    saler: string,
    name: string,
    condition: string,
    mainCategory: string,
    category: string,
    subCategory: string,
    brand: string,
    size: string,
    color: string,
    description: string,
    price: number,
    discount?: number,
    amount: any,
    trade: boolean
}

export const postApi = createApi({
    reducerPath: 'postApi',
    tagTypes: ['Users', 'Products'],
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
        fetchAllProduct: build.query<IProduct[], IProduct>({
            query: () => '/products',
            providesTags: (result) => ['Products']
        }),
        addProduct: build.mutation<IProduct, IProduct>({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Products']
        })
    })
})