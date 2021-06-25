import { observable, action, makeObservable } from 'mobx';
import { KaoyanVocabularyData, findByArray as findVocabularys } from '@/api/modules/server/kaoyan-vocabulary';
import { KaoYanBingData, findByArray as findBings } from '@/api/modules/server/kaoyan-bing';
import to from 'await-to-js';
import RootStore from './root-store';
class ThirdPartyStore {
    @observable fetching = false;
    @observable.ref bing: KaoYanBingData[] = [];
    @observable.ref vocalbulary: KaoyanVocabularyData[] = [];
    private __ids: number[] = [];//已经获取的id
    //  请求数据队列，这样的弊端是只能一次次的请求，而不能并发请求
    //  为什么我不设计成异步请求，这样多个请求就可以一起请求了？
    //  1.是为了服务器考虑，因为我服务器带宽小，能节省流量就节省吧
    //  2.也是为了不必要的重复请求，会过滤重复的id请求，
    //  3.多个同时请求,过滤重复id请求是在请求前吗？考虑请求失败的情况，这样就增加了复杂性
    private __fetchQueue: {
        ids: number[],
        callBack: Function
    }[] = [];

    constructor(private rootStore:RootStore) {
        makeObservable(this);
        this.getBing = this.getBing.bind(this);
        this.getVocalbulary = this.getVocalbulary.bind(this);
    }
    public getBing(id: number) {
        return this.bing.find(i => i.id === id);
    }
    public getVocalbulary(id: number) {
        return this.vocalbulary.find(i => i.id === id);
    }
    @action private setFetching(fetching: boolean) {
        if (fetching !== this.fetching) {
            this.fetching = fetching;
        }
    }
    @action private addBing(bing: KaoYanBingData[]) {
        this.bing = [...this.bing, ...bing]
    }
    @action private addVocalbulary(vocalbulary: KaoyanVocabularyData[]) {
        this.vocalbulary = [...this.vocalbulary, ...vocalbulary]
    }
    public async fetch(ids: number[], callBack: Function) {
        if (this.fetching) {
            return this.__fetchQueue.push({
                ids,
                callBack
            })
        }
        const notRepetitiveIds = new Set([...this.__ids, ...ids]);
        if (notRepetitiveIds.size === this.__ids.length) {
            return callBack();
        }
        const allIds = [...notRepetitiveIds];
        const fetchIds = allIds.slice(this.__ids.length);
        this.setFetching(true);
        const [err, res] = await to(Promise.all([findBings(fetchIds), findVocabularys(fetchIds)]));
        this.setFetching(false);
        if (err) {
            return callBack();
        }
        this.addBing(res![0]!);
        this.addVocalbulary(res![1]!);
        callBack();
    }
}

export default ThirdPartyStore;