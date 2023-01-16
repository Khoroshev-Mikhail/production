import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { References } from '../types/types'

type References_query = {
    item: 'groups' | 'texts' | 'audios' | 'videos', 
    id: number | string
}
export const getReferences = createAsyncThunk<References, References_query>(
    'Thunk: getReferences',
    async function(query: References_query) {
        const response = await fetch(`http://localhost:3002/${query.item}/${query.id}/references`)
        const data = await response.json()
        return data
    }
)
const initialState: References = {
    group: null,
    text: null,
    video: null,
    audio: null,
}
export const referencesSlice = createSlice<References, {}>({
    name: 'referencesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReferences.fulfilled, (_, action) => action.payload)
        builder.addCase(getReferences.rejected, (_, __) => initialState)
    }
})