import { observable, action, makeObservable } from 'mobx';
import { KaoYan, findAll as KaoyanFindAll } from '@/api/modules/server/kaoyan';
import to from 'await-to-js';
import RootStore from './root-store';

class DataStore {
    @observable fetching = false;
    @observable.ref data: KaoYan[] = []
    constructor(private rootStore: RootStore) {
        makeObservable(this);
        const data = localStorage.getItem('data') || false;
        if (data) {
            console.log("本地获取了data");
            this.setData(JSON.parse(data));
        } else {
            this.setFetching(true);
            this.fetch().finally(()=>this.setFetching(false));
        }
    }
    @action setData(data: KaoYan[]) {
        this.data = data;
    }
    @action setFetching(fetching: boolean) {
        if (this.fetching !== fetching) {
            this.fetching = fetching;
        }
    }

    async fetch() {
        if (this.fetching) {
            return Promise.reject("加载中");
        }
        const [err, data] = await to(KaoyanFindAll<KaoYan[]>());
        let ans: Promise<string> = Promise.reject("数据获取失败");
        if (!err) {
            this.setData(data!);
            localStorage.setItem('data', JSON.stringify(data!));
            ans = Promise.resolve("获取数据成功")
        }
        return ans;
    }
}

export default DataStore;