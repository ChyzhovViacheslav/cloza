import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import IProduct from '../models/IProduct'

interface IUser {
    email: string,
    userName: string,
    id: string
}
interface ICategories {
    top: [],
    bottom: [],
    shoes: [],
    accesories: []
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
        fetchProduct: build.query({
            query: (id) => `/products/${id}`
        }),
        addProduct: build.mutation<IProduct, IProduct>({
            query: (body) => ({
                url: '/products',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Products']
        }),
        fetchAllCategories: build.query<ICategories, ICategories>({
            query: () => '/categories'
        }),
        fetchAllBrands: build.query({
            query: () => ({
                url: '/brands'
            })
        })
    })
})