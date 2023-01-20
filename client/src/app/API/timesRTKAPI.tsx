import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Times } from '../types/types'
import { SERVER_URL } from '../variables/dbVariables'
import { TOKEN } from '../variables/localStorageVariables'

export const timesAPI = createApi({
    reducerPath: 'timesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}/times`,
        prepareHeaders: (headers: Headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`)
            return headers
        }
    }),
    tagTypes: ['times'],
    endpoints: (builder) => ({
        getAllTimes: builder.query<Times[], void>({
            query: () =>  `/`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'times' as const, id })),
                    { type: 'times', id: 'LIST' },
                    ]
                : [{ type: 'times', id: 'LIST' }],  
                transformResponse: (resp: Times[]) => resp.sort((a: Times, b: Times) => a.id - b.id)
        }),
        getOneTimes: builder.query<Times, number | string>({
            query: (id: number | string) =>  `/${id}`,
            providesTags: (result, error, id) =>[{ type: 'times', id}]
        }),
    })
})

export const { useGetAllTimesQuery, useGetOneTimesQuery } = timesAPI