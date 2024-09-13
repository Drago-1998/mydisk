import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../features/filesSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
    reducer: {
        files: filesReducer,
        auth: authReducer,
    },
});

export default store;
