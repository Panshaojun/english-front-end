import Model from '@/api/utils/model';
export type KaoYan={
    id:number,
    w:string,
    e:string
}
const KaoyanModel=new Model('kaoyan');

export const findAll=<T>()=>{
    return KaoyanModel.findWhere<T>({
        limit:5500
    });
}