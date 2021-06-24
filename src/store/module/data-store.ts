import { observable, action, makeObservable } from 'mobx';
import { KaoYan, findAll as KaoyanFindAll } from '@/api/modules/server/kaoyan';

class DataStore {
    @observable fetching = false;
    @observable.ref data: KaoYan[] = []
    constructor() {
        makeObservable(this);
        this.init();
    }

    @action
    init() {
        let temp = localStorage.getItem('data') || false;
        if (temp) {
            console.log("本地获取了data");
            this.data = JSON.parse(temp);
        } else {
            this.fetch();
        }
    }
    
    @action.bound
    fetch() {
        if (this.fetching) {
            return;
        }
        this.fetching = true;
        KaoyanFindAll<KaoYan[]>().then(action(res => {
            if (res) {
                this.data = res;
                localStorage.setItem('data', JSON.stringify(res));
            }
        })).finally(action(() => {
            this.fetching = false;
        }))
    }
}

export default DataStore;