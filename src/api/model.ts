import axios from 'axios';
import to from 'await-to-js';
class Model{
    static api=axios.create({
        baseURL:"/model/",
        responseType:'json'
    })
    constructor(private modelName:string){}

    async create<T>(requestData:object={}){
        return this.handleResponse(await to<T>(Model.api.post(this.modelName,requestData)))
    }

    async findWhere<T>(params:string[]){
        return this.handleResponse(await to<T>(Model.api.get(this.modelName,{params})))
    }

    handleResponse<T>(response:[Error, undefined] | [null, T]) {
        const [err,data]=response;
        if(err){
            console.log(err);
            return null;
        }else{
            return data;
        }
    }
}

export const KaoyanModel=new Model('kaoyan');
export const VocabularyKaoyanModel=new Model('vocabularykaoyan');