import axios, { AxiosInstance } from 'axios';

// Create the axios instance with proper TypeScript typings
export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
    },
});