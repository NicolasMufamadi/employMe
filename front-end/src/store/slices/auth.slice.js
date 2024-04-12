import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBaseUrl from "../../config/base.url";

const initialState = {
    user: null,
    newUser: null,
    userToken: null,
    status: ''
}

export const login = createAsyncThunk('auth/login', async (data) => {
   const response = await axiosBaseUrl.post('user/login',{email: data.email,password: data.password})
   console.log(response)
   return response.data 
})

export const getUser = createAsyncThunk('auth/getUser',async(id) =>{
    const response = await axiosBaseUrl.get(`/user/${id}`)
    return response.data
})

export const updateUser = createAsyncThunk('auth/updateUser',async(data) => {
    const response = await axiosBaseUrl.patch(`user/${data.user_id}`,data)
    console.log(response)
    return response.data
})

export const changePassword = createAsyncThunk('auth/changePassword',async(data) => {
    const response = await axiosBaseUrl.patch(`user/change-password/${data.user_id}`,data)
    return response 
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state,action){
            state.user = null;
            state.userToken = null;
            state.status = ''
        },

    },
    extraReducers: builder => {
        builder
        .addCase(login.fulfilled,(state,action) => {
            const user = action.payload
            console.log(user)
            state.user = user
            state.userToken = user.token
            state.status = 'LoggedIn'
        })
        .addCase(login.rejected,(state,action) => {
            state.status = 'error'
            state.user = null
            state.userToken = null
        })
        .addCase(getUser.fulfilled,(state,action) => {
            const user = action.payload
            state.user = user;
        })
        .addCase(getUser.rejected,(state,action) => {
            state.user = null
        })

    }

    
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;