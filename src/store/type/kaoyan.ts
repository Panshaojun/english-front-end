import { KaoYan } from '@/api/modules/server/kaoyan';
export default interface KaoYanStore {
    cacheData: KaoYan[];
    fetchDataByArr: (arr: number[]) => boolean;
}