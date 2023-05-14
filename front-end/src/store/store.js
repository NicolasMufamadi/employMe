import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userSlice';

export default configureStore({
    reducer: {
        user: userSliceReducer,
    }
})