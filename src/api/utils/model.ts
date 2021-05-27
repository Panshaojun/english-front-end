import {AxiosResponse} from 'axios';
import to from 'await-to-js';
import { api } from '@/api';

/**
 * 这是后台sails提供的简便api，通过hhtp请求方式的不同，实现对表的增删改查，非常方便
 */
export default class Model {
    constructor(private modelName: string) { }

    async create<T>(requestData: object = {}) {
        return handleResponse(await to<AxiosResponse<T>>(api.post(this.modelName, requestData)))
    }

    async findWhere<T>(params: {
        where?:JSON,
        limit?:number,
        skip?:number,
        sort?:"age ASC"|string,
        select?:"name,age"|string,
        omit?:"favoriteColor,address"|string,
        populate?:string
    }) {
        return handleResponse(await to<AxiosResponse<T>>(api.get(this.modelName, { params })))
    }
}

const handleResponse=<T>(response: [Error, undefined] | [null, AxiosResponse<T>])=> {
    const [e, data] = response;
    if (e) {
        console.log(e);
        return null;
    }
    if(!data){
        return null
    }
    return data.data;
}