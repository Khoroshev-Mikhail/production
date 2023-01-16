import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Learning, Method, User, Word } from '../types/types'
import { RootState } from '../store'
import axios from 'axios'

const initialWord: Word = {
    id: 0,
    eng: '',
    rus: '',
    img: '',
    audio: '',
}
const initialState: Learning = {
    status: 'fulfilled',
    trueVariant: initialWord,
    falseVariant: [ initialWord, initialWord, initialWord ]
}
export const getLearningThunk = createAsyncThunk<Learning, { method: Method, id: number | string }, { state: RootState }>(
    'Thunk: getLearning',
    async function(payload: { method: Method, id: number | string }, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User}
        if(payload.id <= 0){
            console.error('Не правильный url.', user)
        }
        if(! user.id){
            console.error('Не правильный url.', user)
        }
        const { data, status} = await axios(`http://localhost:3002/vocabulary/${user.id}/unlerned/${payload.method}/group/${payload.id}`)
        if(status === 204){
            return { ...initialState, status: 'completed'}
        }
        return { ...data, status: 'fulfilled'}
    }
)
export const learningSlice = createSlice<Learning, {}>({
    name: 'Slice: Learning',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLearningThunk.fulfilled, (_, action) => action.payload)
        builder.addCase(getLearningThunk.rejected, (_, __) => ({ ...initialState, status: 'rejected'}))
    }
})

export const getTrueVariant = (state: RootState) => state.learning.trueVariant;
export const getFalseVariants = (state: RootState) => state.learning.falseVariant;
export const getLearningStatus = (state: RootState) => state.learning.status;
export const getLearning = (state: RootState) => state.learning;