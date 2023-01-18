import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Word } from '../types/types'
import { SERVER_URL } from '../variables/dbVariables'
import { REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables'

export const wordsAPI = createApi({
    reducerPath: 'wordsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SERVER_URL}/words`,
        prepareHeaders: (headers: Headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`)
            return headers
        }
    }),
    tagTypes: ['words'],
    endpoints: (builder) => ({
        getAllWords: builder.query<Word[], void>({
            query: () =>  `/`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words' as const, id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }],  
                transformResponse: (resp: Word[]) => resp.sort((a: Word, b: Word) => a.id - b.id)
        }),
        getOneWord: builder.query<Word, number | string>({
            query: (id: number | string) =>  `/${id}`,
            providesTags: (result, error, id) =>[{ type: 'words', id}]
        }),
        searchWords: builder.query<Word[], string>({
            query: (str) => ({
                url: `/search`,
                method: 'POST',
                body: { str }
            }),
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words' as const, id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }],  
                transformResponse: (resp: Word[]) => resp.sort((a: Word, b: Word) => a.id - b.id)
        }),
        getWordsByGroup: builder.query<Word[], number>({
            query: (group) =>  `/group/${group}`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'words' as const, id })),
                    { type: 'words', id: 'LIST' },
                    ]
                : [{ type: 'words', id: 'LIST' }],
        }),
        setWord: builder.mutation<Word, any>({ //Надо установить npm install --save @types/formdata
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['words']
        }),
        putWord: builder.mutation<void, any>({
            query: (body) => ({
                url: `/`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['words']
        }),
        deleteWord: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['words']
        })
    })
})

export const { useGetAllWordsQuery, useGetOneWordQuery, useSearchWordsQuery, useSetWordMutation, useGetWordsByGroupQuery, usePutWordMutation, useDeleteWordMutation } = wordsAPI