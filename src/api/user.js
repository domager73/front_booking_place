import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

export const signIn = async (userData) => {
    return await axios.post(`${API_URL}/sign-in`, userData);
};

export const logIn = async (userData) => {
    return await axios.post(`${API_URL}/login`, userData);
};