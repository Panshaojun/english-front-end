import to from 'await-to-js';
import {api} from '@/api';

/**
 * 这是后台sails提供的简便api，通过hhtp请求方式的不同，实现对表的增删改查，非常方便
 */
export default class Model{
    constructor(private modelName:string){}

    async create<T>(requestData:object={}){
        return this.handleResponse(await to<T>(api.post(this.modelName,requestData)))
    }

    async findWhere<T>(params:string[]){
        return this.handleResponse(await to<T>(api.get(this.modelName,{params})))
    }

    handleResponse<T>(response:[Error, undefined] | [null, T]) {
        const [e,data]=response;
        if(e){
            console.log(e);
        }
        return data;
    }
}