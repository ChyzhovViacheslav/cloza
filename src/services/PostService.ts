import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import IProduct from '../models/IProduct'

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
        fetchAllProduct: build.query<IProduct[], number>({
            query: (limit:number = 0) => ({
                url: '/products',
                limit: `/products${limit && `_limit=${limit}`}`
            }),
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
        fetchAllCategories: build.query<ICategories, null>({
            query: () => '/categories'
        }),
        fetchAllBrands: build.query({
            query: () => ({
                url: '/brands'
            })
        })
    })
})