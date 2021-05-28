import { observable,computed, action, makeObservable } from 'mobx';
import { KaoYan } from '@/api/modules/server/kaoyan';
export default abstract class KaoYanStore {
    @observable.ref
    protected __allData: KaoYan[] = []

    @observable.ref
    protected __studyData: number[] = []    //被标记了的单词
    @observable
    protected __studyLength: number = 0;         //最大的学习长度

    @observable
    protected __index: number = 0;          //开始学习的下标
    @observable
    protected __showIndex: number = 0;      //现在展示的长度
    

    constructor() {
        makeObservable(this);
    }

    get studyData():number[]{
        return this.__studyData;
    }

    @computed
    get studyDataShow():KaoYan[]{
        const ans:KaoYan[]=[];
        
        return ans;
    }

    @action
    set index(index: number) {
        this.__index = index;
    }

    @action
    set length(length: number) {
        this.__length = length;
    }

    abstract getData(): void;

}