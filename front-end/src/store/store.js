import { configureStore } from '@reduxjs/toolkit';
import  storage  from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import userSliceReducer from './slices/userSlice';

//configuration to persist the state store into local storage 
const persistConfig = {
    key: 'root',
    storage
}

//enhanced reducer with configuration to persist the userSliceReducer
const persistedReducer = persistReducer(persistConfig,userSliceReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: [thunk]
})

//persist the store 
export const persistor = persistStore(store);
