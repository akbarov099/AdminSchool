import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.39ortomekteb.info/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error.response ? error.response.data : error.message);
    }
);

export default api;
