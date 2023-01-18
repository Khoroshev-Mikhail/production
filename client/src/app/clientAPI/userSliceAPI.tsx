import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { REFRESH_TOKEN } from '../variables/localStorageVariables'
import { removeUserFromLocalStorage, setUserToLocalStorage } from '../fns/localStorageFns'
import { User } from '../types/types'
import { RootState } from '../store'
import { SERVER_URL } from '../variables/dbVariables'

const initialState: User = { id: null, user_login: null, user_name: null, email: null }

export const loginThunk = createAsyncThunk(
    'Thunk: login',
    async function(request: { login: string, password: string}) {
        const response = await fetch(`${SERVER_URL}/user/auth`, {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(request)
        })
        const user = await response.json()
        if(response.ok){ //вынести в МД
            setUserToLocalStorage(user)
        }
        return user
    }
)
export const refreshTokensThunk = createAsyncThunk(
    'Thunk: refreshTokens',
    async function() {
        const response = await fetch(`${SERVER_URL}/user/auth/refresh`, {
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
        return user
    }
)
export const registrationThunk = createAsyncThunk(
    'Thunk: registration',
    async function(request: { login: string, password: string }, thunkApi) {
        const response = await fetch(`${SERVER_URL}/user/registration`, {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify({password: request.password, login: request.login})
        })
        if(response.ok){
            if(request.login && request.password){
                thunkApi.dispatch(loginThunk(request))
            }
        }
    }
)
export const exitThunk = createAsyncThunk(
    'Thunk: exit',
    async function(_, thunkAPI) {
        const { user } = thunkAPI.getState() as { user: User }
        if(! user.id){
            console.error('Вы не авторизированны.')
            removeUserFromLocalStorage()
            return initialState
        }
        const response = await fetch(`${SERVER_URL}/user/logout/${user.id}`)
        const data = await response.json()
        if(response.ok){
            removeUserFromLocalStorage()
        }
        return data
    }
)
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (_, action: PayloadAction<User>) => action.payload)
        builder.addCase(loginThunk.rejected, (_, __) => {
            removeUserFromLocalStorage() //вынеси это все в мидлвейры. и функцию которая сетает это все тоже по хорошему надо туда. мд запиши в этом файле
            return initialState 
        })
        builder.addCase(refreshTokensThunk.fulfilled, (_, action: PayloadAction<User>) => action.payload)
        builder.addCase(refreshTokensThunk.rejected, (_, __) => {
            removeUserFromLocalStorage()
            return initialState 
        })
        builder.addCase(exitThunk.fulfilled, (_, __) => {
            removeUserFromLocalStorage()
            return initialState 
        })
        builder.addCase(exitThunk.rejected, (_, __) => {
            removeUserFromLocalStorage()
            return initialState 
        })
    }
})
export const getUserId = (state: RootState) => state.user.id
export const getUser = (state: RootState) => state.user