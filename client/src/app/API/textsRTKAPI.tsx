import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Text, Title } from '../types/types'
import { SERVER_URL } from '../variables/dbVariables'
export const textsAPI = createApi({
    reducerPath: 'textsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}/texts`,
        prepareHeaders: (headers: Headers) => {
            headers.set('Authorization', `Bearer Ara`)
            return headers
        }
    }),
    tagTypes: ['texts'],
    endpoints: (builder) => ({
        getTexts: builder.query<Text[], void>({
            query: () =>  `/`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'texts' as const, id })),
                    { type: 'texts', id: 'LIST' },
                    ]
                : [{ type: 'texts', id: 'LIST' }], 
            transformResponse: (resp: Text[]) => resp.sort((a: Text, b: Text) => a.id - b.id)
        }),
        getOneText: builder.query<Text, number>({
            query: (id: number) =>  `/${id}`,
            providesTags: (result, error, id) =>[{ type: 'texts', id}]
        }),
        getTitleTexts: builder.query<any, void>({
            query: () =>  `/onlyTitles`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'texts' as const, id })),
                    { type: 'texts', id: 'LIST' },
                    ]
                : [{ type: 'texts', id: 'LIST' }], 
            transformResponse: (resp: Title[]) => resp.sort((a: Title, b: Title) => a.id - b.id)
        }),
        setText: builder.mutation<void, any>({ 
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['texts']
        }),
        deleteText: builder.mutation<void, number>({
            query: (id) => ({
                url: `/`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['texts']
        }),
        updateText: builder.mutation<void, {id: number, title: string, img: string, text_body: string}>({
            query: (body) => ({
                url: `/`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['texts']
        })
    })
})

export const { useGetTextsQuery, useGetTitleTextsQuery, useGetOneTextQuery, useSetTextMutation, useDeleteTextMutation, useUpdateTextMutation } = textsAPI