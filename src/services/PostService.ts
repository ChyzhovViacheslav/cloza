import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

interface ICategory {

}
interface IPost {
    
}

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (build) => ({
        fetchAllCategory: build.query<ICategory[], number>({
            query: (limit: number = 0) => ({
                url: `/type`,
                params: {
                    _limit: limit,
                }
            })
        }),
        fetchAllSex: build.query({
            query: () => ({
                url: `/sex`
            })
        }),
        fetchPostCategory: build.mutation<IPost, IPost>({
            query: (category) => ({
                url: `/type`,
                method: 'POST',
                body: category
            })
        })
    })
})