import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

interface ICategories {
    id: number,
    type: string
}

interface ISex {
    id: number
    type: string
}

interface IItem {
    id: number
    name: string,
    type: string,
    user: string,
    category: string,
    string: string,
    main_color: string,
    price: number,
    brand: string,
    verified_saler?: boolean,
    condition: string,
    size: string,
    photo?: string,
    sale: number
}

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
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
        }),
        fetchAllItem: build.query<IItem[], IItem>({
            query: () => ({
                url: `/item`
            })
        })
    })
})