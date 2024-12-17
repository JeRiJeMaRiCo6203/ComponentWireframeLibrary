import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://t40xrmsv-4321.asse.devtunnels.ms/',
    headers: {
      'Content-Type': 'application/json',
    },
});
