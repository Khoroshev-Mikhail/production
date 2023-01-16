import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Group, Word } from '../types/types'

type GroupState = {
    group: Group,
    words: Word[]
}

const initialState: GroupState = {
    group: {
        id: 0,
        title: '',
        title_rus: '',
        img: '',
        words: []
    },
    words: []
}
export const getGroupThunk = createAsyncThunk<Group, number | string>(
    'Thunk: getGroup',
    async function(id) {
        if(id <= 0){
            return initialState.group
        }
        const response = await fetch(`http://localhost:3002/groups/${id}`) //Потом здесб добавить пагинацию
        return await response.json()
    }
)
export const getAllWordsFromGroupThunk = createAsyncThunk<Word[], number | string>(
    'Thunk: getAllWordsFromGroup',
    async function(id) {
        if(id <= 0){
            return []
        }
        const response = await fetch(`http://localhost:3002/groups/${id}/words`) //Потом здесб добавить пагинацию
        return await response.json()
    }
)
export const groupSlice = createSlice<GroupState, {}>({
    name: 'Slice: group',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGroupThunk.fulfilled, (state, action) => ({ ...state,  group: action.payload }));
        builder.addCase(getGroupThunk.rejected, (state, __) => ({ ...state,  group: initialState.group }));
        builder.addCase(getAllWordsFromGroupThunk.fulfilled, (state, action) => ({ ...state,  words: action.payload }));
        builder.addCase(getAllWordsFromGroupThunk.rejected, (state, __) => ({ ...state,  words: initialState.words }));
    }
})
//каша с названиями word внутри groups в бд по сути должен быть word_ids
export const getGroup = (state: RootState) => state.group
export const getAllWordsFromGroup = (state: RootState) => state.group.words
export const getWord_idsFromGroup = (state: RootState) => state.group.group.words