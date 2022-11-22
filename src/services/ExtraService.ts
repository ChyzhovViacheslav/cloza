import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const extraApi = createApi({
    reducerPath: 'extraApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:2000/'
    }),
    endpoints: (build) => ({
        getAllBrands: build.query({
            query: ({page, params}) => ({
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
        })
    })
})