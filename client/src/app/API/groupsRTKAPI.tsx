import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables';
import { exitThunk } from '../clientAPI/userSliceAPI';
import { Group, Title, Word } from '../types/types'
import { setUserToLocalStorage } from '../fns/localStorageFns';

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:3002/groups',
    prepareHeaders: (headers: Headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`)
      return headers
    }
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result.error?.originalStatus === 401 || result.error?.status === 401){
        const refresh = await fetch('http://localhost:3002/user/refreshToken', {         
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({
                refreshToken: localStorage.getItem(REFRESH_TOKEN)
            })
        })
        if(refresh.status === 200){
            console.log('Токены получены. Перезапускаю функцию')
            const data = await refresh.json()   
            setUserToLocalStorage(data)
            return await baseQuery(args, api, extraOptions)
        } else{
            console.log('Ошибка токена. Диспатчу exitThunk()')
            api.dispatch(exitThunk())
        }
    }
    return result
}

export const groupsAPI = createApi({
    reducerPath: 'groupsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['groups', 'wordsFromGroup'],
    endpoints: (builder) => ({
        getGroups: builder.query<Group[], void>({
            query: () =>  `/`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'groups' as const, id })),
                    { type: 'groups', id: 'LIST' },
                    ]
                : [{ type: 'groups', id: 'LIST' }], 
            transformResponse: (resp: Group[]) => resp.sort((a: Group, b: Group) => a.id - b.id)
        }),
        getGroupsTitles: builder.query<Title[], void>({
            query: () =>  `/titles`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'groups' as const, id })),
                    { type: 'groups', id: 'LIST' },
                    ]
                : [{ type: 'groups', id: 'LIST' }], 
            transformResponse: (resp: Title[]) => resp.sort((a: Title, b: Title) => a.id - b.id)
        }),
        getOneGroup: builder.query<Group, number | string>({
            query: (id: number) =>  `/${id}`,
            providesTags: (result, error, id) =>[{ type: 'groups', id}]
        }),
        setGroup: builder.mutation<void, {title: string, title_rus: string}>({
            query: (body) => ({
                url: `/`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['groups']
        }),
        deleteGroup: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['groups']
        }),
        putGroup: builder.mutation<void, { id: number | string, title: string, title_rus: string }>({
            query: (body) => ({
                url: `/`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups']
        }),
        setWordToGroup: builder.mutation<void, { id: number | string, word_id: number } >({
            query: (body) => ({
                url: `/${body.id}/word_ids`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['groups', 'wordsFromGroup']
        }),
        deleteWordFromGroup: builder.mutation<void, { id: number | string, word_id: number }>({
            query: (body: { id: number | string, word_id: number }) => ({
                url: `/${body.id}/word_ids`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['groups', 'wordsFromGroup']
        }),
        getWordsFromGroup: builder.query<Word[], string | number>({
            query: (id) =>  `/${id}/words`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }: any) => ({ type: 'wordsFromGroup' as const, id })),
                    { type: 'wordsFromGroup', id: 'LIST' },
                    ]
                : [{ type: 'wordsFromGroup', id: 'LIST' }], 
            transformResponse: (resp: Word[]) => resp.sort((a: Word, b: Word) => a.id - b.id)
        }),
    })
})

export const { useGetGroupsQuery, useGetGroupsTitlesQuery, useGetOneGroupQuery, useSetGroupMutation, useDeleteGroupMutation, usePutGroupMutation, useSetWordToGroupMutation, useDeleteWordFromGroupMutation, useGetWordsFromGroupQuery } = groupsAPI