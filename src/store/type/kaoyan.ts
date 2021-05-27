import {KaoYan} from '@/api/modules/kaoyan';
export default interface KaoYanStore{
    cacheData:KaoYan[];
    fetchDataByArr:(arr:number[])=>boolean;
}