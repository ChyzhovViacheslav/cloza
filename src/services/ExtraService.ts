import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const extraApi = createApi({
    reducerPath: 'extraApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/'
    }),
    endpoints: (build) => ({
        getAllBrands: build.query({
            query: () => ({
                url: 'brands/',
                method: 'GET'
            })
        }),
        getCategories: build.query({
            query: () => ({
                url: 'categories/',
                method: 'GET'
            })
        })
    })
})