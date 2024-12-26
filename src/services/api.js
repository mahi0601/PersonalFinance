// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8000/', // Replace with your backend base URL
//     withCredentials: true, // Ensures cookies are sent with requests
// });

// // Authentication APIs
// export const login = (credentials) => api.post('/auth/login', credentials);
// export const signup = (credentials) => api.post('/auth/signup', credentials);
// export const logout = () => api.post('/logout');
// export const refreshToken = () => api.post('/token/refresh');

// // Transaction APIs
// export const getTransactions = () => api.get('/transactions');
// export const addTransaction = (transaction) => api.post('/transactions', transaction);
// export const updateTransaction = (id, transaction) => api.put(`/transactions/${id}`, transaction);
// export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

// // Dashboard APIs
// export const getDashboardData = () => api.get('/dashboard');

// // Exchange Rate APIs (Bonus feature)
// export const getExchangeRates = () => api.get('/exchange-rates');

// export default api;

// import axios from 'axios';

// // Create an Axios instance with default configuration


// Authentication APIs
// export const signup = async (credentials) => {
//     try {
//         const response = await api.post('/auth/signup/', credentials);
//         return response.data;
//     } catch (error) {
//         console.error('Signup failed:', error.response?.data || error.message);
//         throw error;
//     }
// };
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000', // Backend base URL
    withCredentials: true, // Ensures cookies are sent with requests
});
export const signup = async (username, password) => {
    try {
        const response = await api.post(
            `http://localhost:8000/auth/signup/`,
            null, // Pass `null` as data since we use query parameters
            {
                params: {
                    username: username,
                    password: password,
                },
            }
        );
        console.log('Signup successful:', response.data);
    } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error.message);
    //     if (error.response && error.response.status === 422) {
    //         // Handle validation errors
    //         const errors = error.response.data;
    //         // Use `errors` for UI feedback
    //     }
    }
};


export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login/', credentials);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout/');
        return response.data;
    } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message);
        throw error;
    }
};

export const refreshToken = async (token) => {
    try {
        const response = await api.post('/auth/token-refresh/', { token });
        return response.data;
    } catch (error) {
        console.error('Token refresh failed:', error.response?.data || error.message);
        throw error;
    }
};

// Transaction APIs (example placeholders)
export const getTransactions = async () => {
    try {
        const response = await api.get('/transactions');
        return response.data;
    } catch (error) {
        console.error('Fetching transactions failed:', error.response?.data || error.message);
        throw error;
    }
};

// Dashboard APIs (example placeholders)
export const getDashboardData = async () => {
    try {
        const response = await api.get('/dashboard');
        return response.data;
    } catch (error) {
        console.error('Fetching dashboard data failed:', error.response?.data || error.message);
        throw error;
    }
};

export default api;
