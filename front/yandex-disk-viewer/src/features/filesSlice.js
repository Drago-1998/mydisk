// src/features/filesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для получения файлов по публичной ссылке
export const fetchFiles = createAsyncThunk('files/fetchFiles', async (publicLink, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/yandex-disk/',  { public_link: publicLink });
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response?.data || 'Ошибка при загрузке файлов');
    }
});

const filesSlice = createSlice({
    name: 'files',
    initialState: {
        loading: false,
        files: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default filesSlice.reducer;
