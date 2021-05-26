import axios from 'axios';
export type ResponseType<T> ={
    code:number,
    data?:T,
    msg?:string
}
export const api=axios.create({ //我自己服务器的api
    baseURL:"/model/",
    responseType:'json'
})