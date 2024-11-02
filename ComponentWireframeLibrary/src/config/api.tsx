import axios, { AxiosInstance } from 'axios';

// Create the axios instance with proper TypeScript typings
export const api: AxiosInstance = axios.create({
    // baseURL: 'https://t40xrmsv-4321.asse.devtunnels.ms/',
    baseURL: 'http://localhost:4321',
    headers: {
        'Content-Type': 'application/json',
    },
});