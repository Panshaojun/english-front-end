import { observable, computed, action, makeObservable } from 'mobx';
import { KaoYan, findAll } from '@/api/modules/server/kaoyan';
export default class KaoYanStore {
    @observable.ref
    protected __allData: KaoYan[] = [];

    @observable.ref
    protected __studyData: number[] = [];       //被标记了的单词
    @observable
    protected __studyLength: number = 0;        //最大的学习长度

    @observable
    protected __startIndex: number = 0;         //开始学习的下标
    @observable
    protected __showLength: number = 100;       //现在展示的长度

    constructor() {
        makeObservable(this);
        this.init();
    }

    @action.bound init() {
        this.__startIndex = 0;
        this.__showLength = 100;
        if (!this.__allData.length) {
            findAll<KaoYan[]>().then(action((res) => {
                if (res) {
                    this.__allData = res;
                }
            }))
        }
    }

    @computed get data(): KaoYan[] {
        return this.__allData.slice(this.__startIndex, this.__showLength);
    }

}