import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Method, Progress, TrueAndFalseVariants, Word } from '../types/types'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { exitThunk } from '../clientAPI/userSliceAPI';
import { JWT_EXPIRE, REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables';
import { setUserToLocalStorage } from '../fns/localStorageFns';

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:3002/vocabulary',
    prepareHeaders: (headers: Headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`)
      return headers
    }
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result.error && result.error.status === 401){ //result.error?.originalStatus === 401 || result.error?.status === 401
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
export const vocabularyAPI = createApi({
    reducerPath: 'vocabularyApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['vocabulary'],
    endpoints: (builder) => ({
        getVocabulary: builder.query<any, number | string>({
            query: (id: number | string) =>  `/${id}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
        }),
        getUnlerned: builder.query<TrueAndFalseVariants, { id_user: number, method: Method, id_group: number | string }>({ //может надо разбить на отдельные методы лучше
            query: (body) =>  `/${body.id_user}/unlerned/${body.method}/group/${body.id_group}`,
            providesTags: (result, error, req) => [{ type: 'vocabulary', req }], //КАК ТАК?
        }),
        getUnlernedSpell: builder.query<any, any>({ //может надо разбить на отдельные методы лучше
            //и указать теги для каждого метода чтобы не загружать все целиком
            query: (req) =>  `/${req.userId}/unlerned/spelling/group/${req.groupId}`,
            providesTags: (result, error, id) => [{ type: 'vocabulary', id }],
            transformResponse: (resp: Word) => ({...resp, trueVariant: resp.eng, eng: resp.eng.toUpperCase().split('').sort(() => Math.random() - 0.5).join('')})
        }),
        setVocabulary: builder.mutation<any, {method: string, word_id: number, id_user: number}>({
            query: (body) => ({
                url: `/${body.id_user}/${body.method}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['vocabulary']
        }),
        deleteVocabulary: builder.mutation<any, {method: string, word_id: number, id_user: number}>({
            query: (body) => ({
                url: `/${body.id_user}/${body.method}`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['vocabulary']
        }),
        getGroupProgess: builder.query<Progress, { id_group: string | number, id_user: string | number}>({
            query: (body) =>  `groups/${body.id_group}/progress/${body.id_user}`, //костыль, есть кейсы когда в группу кладется undefined, а userId 0, Надо обработать ошибку нормально> убери костыль и посмотри консоль при обновлении страницы и все поймешь
            providesTags: ['vocabulary'], 
        }),
        getWordsFromVocabulary: builder.query<Word[], {id_user: string | number, limit: number, str: string}>({
            query: (body) =>  `/${body.id_user}/words?limit=${body.limit}${body.str !== '' ? ('&str=' + body.str) : ''}`,
            providesTags: ['vocabulary'], 
        }),
    })
})

export const { useGetVocabularyQuery, useSetVocabularyMutation, useGetUnlernedQuery, useGetUnlernedSpellQuery,  useDeleteVocabularyMutation, useGetGroupProgessQuery, useGetWordsFromVocabularyQuery } = vocabularyAPI