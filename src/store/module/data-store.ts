import { observable, action, makeObservable } from 'mobx';
import { KaoYan, findAll as KaoyanFindAll } from '@/api/modules/server/kaoyan';
import to from 'await-to-js';
import RootStore from './root-store';

class DataStore {
    @observable fetching = false;
    @observable.ref data: KaoYan[] = []
    constructor(private rootStore:RootStore) {
        makeObservable(this);
        const data = localStorage.getItem('data') || false;
        if (data) {
            console.log("本地获取了data");
            this.setData(JSON.parse(data));
        } else {
            this.fetch();
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
        this.setFetching(true);
        const [err, data] = await to(KaoyanFindAll<KaoYan[]>());
        this.setFetching(false);
        if (err) {
            return Promise.reject("数据获取失败");
        } else {
            this.setData(data!);
            localStorage.setItem('data', JSON.stringify(data!));
        }
        return Promise.resolve("获取数据成功")
    }
}

export default DataStore;