import to from 'await-to-js';
import {api} from '@/api';
class Model{
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

export const KaoyanModel=new Model('kaoyan');
export const KaoyanVocabularyModel=new Model('kaoyanvocabulary');
export const KaoyanbingModel=new Model('kaoyanbing');
