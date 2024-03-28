import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBaseUrl from "../../config/base.url";

const initialState = {
    user: null,
    userToken: null,
    status: ''
}

export const login = createAsyncThunk('auth/login', async (data) => {
   const response = await axiosBaseUrl.post('user/login',{email: data.email,password: data.password})
   return response.data 
})

export const isAuthenticated = createAsyncThunk('auth/isAuthenticated',async(token) =>{
    const response = await axiosBaseUrl.get('/user/auth',{headers: {'Authorization': `bearer ${token}`}})
    return response.data
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state,action){
            state.user = null;
            state.userToken = null;
            state.status = ''
        }
    },
    extraReducers: builder => {
        builder
        .addCase(login.fulfilled,(state,action) => {
            const user = action.payload
            state.user = user
            state.userToken = user.token
            state.status = 'LoggedIn'
        })
        .addCase(login.rejected,(state,action) => {
            state.status = 'error'
            state.user = null
            state.userToken = null
        })
        .addCase(isAuthenticated.rejected,(state,action) => {
            state.status = ''
            state.user = null
            state.userToken = null
        })

    }

    
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;