import { observable, action, makeObservable } from 'mobx';
import { KaoYanBingData, findByArray } from '@/api/modules/server/kaoyan-bing';

export default class BingStore {
    @observable.ref
    private __data: KaoYanBingData[] = [];
    constructor() {
        makeObservable(this);
    }

    fetchData(ids: number[]) {
        const temp = [];
        for (let i of ids) {
            if (this.__data.findIndex(j => j.id === i) === -1) {
                temp.push(i);
            }
        }
        if (temp.length) {
            return;
        }
        findByArray(temp).then(action((res) => {
            const ans = res ?? [];
            if (ans.length) {
                this.__data = [...this.__data, ...ans];
            }
        }))
    }

    @action.bound
    data(id: number) {
        let ans: KaoYanBingData | undefined;
        ans = this.__data.find(i => i.id === id);
        return ans || {};
    }
}