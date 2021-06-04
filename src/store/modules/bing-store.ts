import { observable, action, makeObservable } from 'mobx';
import { KaoYanBingData, findByArray, findOne } from '@/api/modules/server/kaoyan-bing';

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
        if (!temp.length) {
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
    getData(id: number, setCall: (data: KaoYanBingData) => void) {
        let ans: KaoYanBingData | undefined;
        ans = this.__data.find(i => i.id === id);
        if (ans) {
            return setCall(ans);
        }
        findOne(id).then(action(res => {
            if (res) {
                setCall(res);
                let ans2 = this.__data.find(i => i.id === id);
                if (!ans2) {
                    this.__data = [...this.__data, res];
                }
            }
        }))
    }
}