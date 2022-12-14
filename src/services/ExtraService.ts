import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IOrder from "../models/IOrder";
import IReview from "../models/IReview";

export const extraApi = createApi({
    reducerPath: 'extraApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/'
    }),
    endpoints: (build) => ({
        getAllBrands: build.query({
            query: ({ page, params }) => ({
                url: `brands/?page=${page}`,
                method: 'GET',
                params
            })
        }),
        getCategories: build.query({
            query: () => ({
                url: 'categories/',
                method: 'GET'
            })
        }),
        addReview: build.mutation<IReview, IReview>({
            query: (body) => ({
                url: 'review/',
                method: 'POST',
                body
            })
        }),
        getAllReview: build.query({
            query: ({ page, limit, userId, params }) => ({
                url: `review/?page=${page}&limit=${limit}&userId=${userId}`,
                method: 'GET',
                params
            })
        }),
        createOrder: build.mutation<IOrder, IOrder>({
            query: (body) => ({
                url: 'order/',
                method: 'POST',
                body
            })
        })
    })
})