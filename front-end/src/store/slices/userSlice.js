import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       setUser(state,action){
           state.user = action.payload
       },
       logout(state){
          state.user = null;
          localStorage.clear();
       }
    }
})

export const fetchUser = createAsyncThunk('user/fetchUser',async(id,{getState}) => {
   const res = await axios.get('http://localhost:4444/user/'+id);
   return res;
})


export const getUser = (state) => state.user.user;

export const { setUser,logout } = userSlice.actions;

export default userSlice.reducer;