import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IProduct from '../models/IProduct'

export const productApi = createApi({
    reducerPath: 'productApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://cloza-api.vercel.app/products'
    }),
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: ({
                page,
                limit,
                maincategory,
                sortByPrice,
                email,
                params,
                emptyField,
                discount
            }) => ({
                url: `/?page=${page}&limit=${limit}&maincategory=${maincategory}&sortByPrice=${sortByPrice}&salerEmail=${email}&emptyField=${emptyField}&discount=${discount}`,
                method: 'GET',
                params
            }),
            providesTags: (result) => ['Products']
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET'
            })
        }),
        addProduct: build.mutation<IProduct, IProduct>({
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            })
        }),
        updateProduct: build.query<IProduct, IProduct>({
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