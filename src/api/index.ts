import axios from 'axios';

export const api = axios.create({ //我自己服务器的api
    baseURL: process.env.NODE_ENV === 'development' ? "/api" : "",
    responseType: 'json'
})

