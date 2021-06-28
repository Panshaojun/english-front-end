import axios from 'axios';

export const api = axios.create({ //我自己服务器的api
    baseURL: "/api/",
    responseType: 'json'
})

