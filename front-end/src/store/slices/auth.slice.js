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
   return response.data 
})

export const getUser = createAsyncThunk('auth/getUser',async() =>{
    const response = await axiosBaseUrl.get(`/user/auth`,{
        headers: {
            "Authorization": 'Bearer '+ localStorage.getItem('jwtToken')
        }
    })
    console.log(response)
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
            localStorage.removeItem('jwtToken')
            state.status = ''
        },

    },
    extraReducers: builder => {
        builder
        .addCase(login.fulfilled,(state,action) => {
            const user = action.payload
            state.user = user
            state.userToken = user.token
            state.status = 'LoggedIn'
            localStorage.setItem('jwtToken',user.token)
        })
        .addCase(login.rejected,(state,action) => {
            state.status = 'error'
        })
        .addCase(getUser.fulfilled,(state,action) => {
            const user = action.payload
            state.user = user;
        })
        .addCase(getUser.rejected,(state,action) => {
            state.status = "Unathorized"
            localStorage.removeItem('jwtToken')
            state.user = null
        })

    }

    
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;