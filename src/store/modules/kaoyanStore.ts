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
    protected __showLength: number = 50;       //现在展示的长度

    constructor() {
        makeObservable(this);
        this.init();
    }

    @action.bound init() {
        this.__startIndex = 0;
        this.__showLength = 50;
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

    @computed get study(): KaoYan[] {
        const ans: KaoYan[] = [];
        for (
            let i = this.__startIndex,
            len1 = this.__startIndex + this.__showLength,
            j = 0,
            len2 = this.__studyData.length
            ; i < len1 && j<len2; i++) {
            while(this.__allData[i].id!==this.__studyData[j]){
                i++;
            }
        }
    }

    @action.bound addShowLength(len: number) {
        if (len < 0) {
            return;
        }
        this.__showLength += Math.floor(len);
    }

    @action.bound addStudy(id: number) {
        const temp: number[] = [...this.__studyData];
        temp.push(id);
        temp.sort((a, b) => a - b);
        this.__studyData = temp;
    }

}