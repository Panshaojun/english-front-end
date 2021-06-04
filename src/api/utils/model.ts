import { AxiosResponse } from 'axios';
import to from 'await-to-js';
import { api } from '@/api';

/**
 * sails提供了基于http请求方式的不同，实现了对表的增删改查的简便api，非常方便
 * 这里将其写成一个请求类
 */
export default class Model {
    constructor(private modelName: string) { }

    async create<T>(requestData: object = {}) {
        return handleResponse(await to<AxiosResponse<T>>(api.post(this.modelName, requestData)))
    }

    async findWhere<T>(params: {
        where?: object,
        limit?: number,
        skip?: number,
        sort?: "age ASC" | string,
        select?: "name,age" | string,
        omit?: "favoriteColor,address" | string,
        populate?: string
    }) {
        return handleResponse(await to<AxiosResponse<T>>(api.get(this.modelName, { params })))
    }

    async findOne<T>(id: number) {
        return handleResponse(await to<AxiosResponse<T>>(api.get(`${this.modelName}/${id}`)))
    }

    async findAll<T>() {
        return handleResponse(await to<AxiosResponse<T>>(api.get(this.modelName)))
    }

    async update<T extends object>(id: number, data: T) {
        return handleResponse(await to<AxiosResponse<T>>(api.patch(`${this.modelName}/${id}`, data)))
    }

    async destroy<T extends object>(id: number) {
        return handleResponse(await to<AxiosResponse<T>>(api.delete(`${this.modelName}/${id}`)))
    }
}

const handleResponse = <T>(response: [Error, undefined] | [null, AxiosResponse<T>]) => {
    const [e, data] = response;
    if (e) {
        return null;
    }
    if (!data) {
        return null
    }
    return data.data;
}