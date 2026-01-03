import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';
const api = axios.create({
    baseURL: `${BASE_URL}/api`
});


api.interceptors.request.use((config) => {
    const stored = JSON.parse(localStorage.getItem('user') || 'null');
    const token = stored?.data?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const todoService ={
    getTodos: () => api.get(`/todos`),
    createTodo: (data) => api.post(`/todos`, data),
    updateTodo: (id, data) => api.put(`/todos/${id}`, data),
    deleteTodo: (id) => api.delete(`/todos/${id}`)
};

export const userService={
    createuser: (data) => api.post(`/user/signup`, data),
    loginuser: (data) => api.post(`/user/login`, data),
    // updateTodo: (id, data) => axios.put(`${BASE_URL}/user/${}`, data),
    // deleteuser: (id) => axios.delete(`${BASE_URL}/user/${email}`)
};

export default {todoService, userService};