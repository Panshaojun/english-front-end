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
    public async fetch(ids: number[]) {
        if (this.fetching) {
            return;
        }
        const notRepetitiveIds = new Set([...this.__ids, ...ids]);
        if (notRepetitiveIds.size === this.__ids.length) {
            return;
        }
        const allIds = [...notRepetitiveIds];
        const fetchIds = allIds.slice(this.__ids.length);
        this.setFetching(true);
        const [err, res] = await to(Promise.all([findBings(fetchIds), findVocabularys(fetchIds)]));
        this.setFetching(false);
        if (err) {
            return alert("获取数据失败");
        }
        this.addBing(res![0]!);
        this.addVocalbulary(res![1]!);
    }
}

export default ThirdPartyStore;