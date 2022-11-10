import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IProduct from '../models/IProduct'

export const productApi = createApi({
    reducerPath: 'productApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/products'
    }),
    endpoints: (build) => ({
        getAllProducts: build.query<IProduct[], Object>({
            query: ({page, limit, params}:any) => ({
                url: `/?page=${page}&limit=${limit}`,
                method: 'GET',
                params
            }),
            providesTags: (result) => ['Products']
        }),
        getProduct: build.query<IProduct, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            })
        }),
        addProduct: build.query<IProduct, any>({
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            })
        }),
        updateProduct: build.query<IProduct, any>({
            query: (body) => ({
                url: '/',
                method: 'PUT',
                body
            })
        }),
        deleteProduct: build.query<IProduct, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            })
        })
    })
})