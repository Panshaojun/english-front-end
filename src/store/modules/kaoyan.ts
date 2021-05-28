import { observable, computed, action,makeObservable } from 'mobx';
import { KaoYan } from '@/api/modules/server/kaoyan';
import KaoYanStore from '@/store/types/kaoyan';

export default class KaoYanIml implements KaoYanStore{
    @observable public cacheData:KaoYan[]=[];
    @observable index=0;
    @observable private length=50;
    constructor(){
        makeObservable(this)
    }
    @action
    addIndex(){
        this.index++;
    }


}