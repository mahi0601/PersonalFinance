import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true, // To include HttpOnly cookies
});

export default api;
