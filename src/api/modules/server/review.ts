import Model from '@/api/utils/model';
export type Review={
    id:number,
    date:string,
    ids:number[]
}
const KaoyanModel=new Model('review');