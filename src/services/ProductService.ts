import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IProduct from '../models/IProduct'

interface IgetAllProducts {
    page: number,
    limit: number,
    maincategory: string,
    sortByPrice: number | null
    params: any
}

export const productApi = createApi({
    reducerPath: 'productApi',
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/products'
    }),
    endpoints: (build) => ({
        getAllProducts: build.query<any, Object>({
            query: ({ page, limit, maincategory, sortByPrice, params }: IgetAllProducts) => ({
                url: `/?page=${page}&limit=${limit}&maincategory=${maincategory}&sortByPrice=${sortByPrice}`,
                method: 'GET',
                params
            }),
            providesTags: (result) => ['Products']
        }),
        getProduct: build.query<IProduct, string>({
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