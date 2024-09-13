import axios from 'axios';
import store from "./app/store";

const instance = axios.create({
    baseURL: 'http://localhost:8000',  // Замените на ваш URL API
});

instance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const { refreshToken } = store.getState().auth;
        const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
        store.dispatch({ type: 'auth/refreshToken', payload: response.data });
        instance.defaults.headers.Authorization = `Bearer ${response.data.access}`;
        return instance(originalRequest);
    }
    return Promise.reject(error);
});

export default instance;
