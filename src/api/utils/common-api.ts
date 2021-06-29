import { AxiosResponse } from 'axios';
import { api } from '@/api';
import to from 'await-to-js';

export type ResponseType<T> = {
    code: number,
    data?: T,
    msg?: string
}


export const get=<T>(url:string,params:object)=>to(api.get<ResponseType<T>>(url,{params}));

export const post=<T>(url:string,params:object)=>to(api.post<ResponseType<T>>(url,params));

export function handleResult<T>(result: [Error|null, undefined] | [null, AxiosResponse<ResponseType<T>>]): null | T {
    const [e, data] = result;
    if (e) {
        return null;
    } else {
        if (data) {
            const { code, data: res } = data.data;
            if (code === 0) {
                return res ? res : null;
            } else {
                return null;
            }
        } else {
            return null
        }
    }
}