import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User, Vocabulary } from '../types/types'
import { SERVER_URL, USER_VOCABULARY_COLUMN } from '../variables/dbVariables'
import { REFRESH_TOKEN, TOKEN } from '../variables/localStorageVariables'
import axios from 'axios'
import { setUserToLocalStorage } from '../fns/localStorageFns'

const instance = axios.create({baseURL: `${SERVER_URL}/vocabulary`})
instance.interceptors.response.use(null, async (error) => {
    const response = await fetch('http://localhost:3002/user/auth/refresh', {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({
                refreshToken: localStorage.getItem(REFRESH_TOKEN)
            })
        })
    const user = await response.json()
    if(response.ok){
        setUserToLocalStorage(user)
    }
    error.config.headers['Authorization'] = `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`
    return axios.request(error.config)
})
const initialState: Vocabulary = {
    english: [],
    russian: [],
    spelling: [],
    auding: [],
    texts: [],
    audios: [],
    videos: [],
}

export const getVocabularyThunk = createAsyncThunk<Vocabulary, void, { state: RootState }>(
    'Thunk: getVocabulary',
    async function(_, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        if(user.id === null){
            return initialState
        }
        const { data } = await instance(`/${user.id}`)
        return data
    }
)
export const setVocabularyAndGetUpdatedVocabularyThunk = createAsyncThunk<Vocabulary, { method: string, word_id: number }, { state: RootState }>(
    'Thunk: setVocabularyAndGetUpdatedVocabulary',
    async function(payload: { method: string, word_id: number }, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        const { vocabulary } = thunkAPI.getState() as { vocabulary: Vocabulary}
        if(user.id === null){
            console.error('Не указан user.')
            return vocabulary //пересмотри это
        }
        if(! USER_VOCABULARY_COLUMN.includes(payload.method)){
            console.error('Не правильный url.')
            return vocabulary //пересмотри это
        }
        const { data, status } = await instance({
            url: `/${user.id}/${payload.method}`,
            method: 'put',
            data: { ...payload },
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`}
        })
        return data
    }
)
export const deleteFromVocabularyAndGetUpdatedVocabularyThunk = createAsyncThunk<Vocabulary, { method: string, word_id: number }, { state: RootState }>(
    'Thunk: deleteFromVocabularyAndGetUpdatedVocabulary',
    async function(payload: { method: string, word_id: number }, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        const { vocabulary } = thunkAPI.getState() as { vocabulary: Vocabulary}
        if(user.id === null){
            console.error('Не указан user.')
            return vocabulary //пересмотри это
        }
        if(! USER_VOCABULARY_COLUMN.includes(payload.method)){
            console.error('Не правильный url.')
            return vocabulary //пересмотри это
        }
        const { data } = await instance({
            url: `/${user.id}/${payload.method}`,
            method: 'delete',
            data: { ...payload },
            headers: {'Authorization': `Bearer ${localStorage.getItem(TOKEN) || 'unknown' }`}
        })
        return data
    }
)
export const vocabularySlice = createSlice<Vocabulary, any>({ //Укажи тип редусеров
    name: 'Slice: Vocabulary',
    initialState,
    reducers: {
        pushEnglish: (state: Vocabulary, action: PayloadAction<number>) => {
            state.english.push(action.payload);
        },
        pushRussian: (state: Vocabulary, action: PayloadAction<number>) => {
            state.russian.push(action.payload);
        },
        pushSpelling: (state: Vocabulary, action: PayloadAction<number>) => {
            state.spelling.push(action.payload);
        },
        pushAuding: (state: Vocabulary, action: PayloadAction<number>) => {
            state.auding.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVocabularyThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(getVocabularyThunk.rejected, (state, __) => state) //пересмотри реджекты
        builder.addCase(setVocabularyAndGetUpdatedVocabularyThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(setVocabularyAndGetUpdatedVocabularyThunk.rejected, (state, __) => state)
        builder.addCase(deleteFromVocabularyAndGetUpdatedVocabularyThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(deleteFromVocabularyAndGetUpdatedVocabularyThunk.rejected, (state, __) => state)
    }
})
export const { pushEnglish, pushRussian, pushSpelling, pushAuding} = vocabularySlice.actions
export const getVocabulary = (state: RootState) => state.vocabulary;
export const getVocabularyEnglish = (state: RootState) => state.vocabulary.english;
export const getVocabularyRussian = (state: RootState) => state.vocabulary.russian;
export const getVocabularySpelling = (state: RootState) => state.vocabulary.spelling;
export const getVocabularyAuding = (state: RootState) => state.vocabulary.auding;