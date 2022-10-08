import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

interface ICategories{
    id: number,
    type: string
}

interface ISex{
    id: number
    type: string
}

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (build) => ({
        fetchAllCategories: build.query<ICategories[], ICategories>({
            query: () => ({
                url: `/categories`
            })
        }),
        fetchAllSex: build.query<ISex[], ISex>({
            query: () => ({
                url: `/sex`
            })
        })
    })
})