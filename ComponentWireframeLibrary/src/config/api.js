import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://t40xrmsv-4321.asse.devtunnels.ms/api/',
    // baseURL: 'https://18wmxsff-4321.asse.devtunnels.ms/api/',
    headers: {
      'Content-Type': 'application/json',
    },
});
