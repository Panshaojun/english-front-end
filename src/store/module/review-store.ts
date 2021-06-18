import RootStore from './root-store';
import { observable, action, makeObservable } from 'mobx';
import { findAll as ReviewFindAll, ReviewData } from '@/api/modules/server/review';
import { KaoYan } from '@/api/modules/server/kaoyan';
import moment from 'moment';
class ReviewStore {
    @observable fetching = true;
    callBacks:Function[]=[];
    @observable public uploading = false;                 //上传状态
    @observable.ref public data: ReviewData[] = [];         //所有复习
    @observable.ref public reviewToday: ReviewData[] = [];  //今日复习

    constructor(public rootStore: RootStore) {
        makeObservable(this);
        this.fetch();
    }

    fetch(res?:Function) {
        if (this.fetching) {
            return;
        } else {
            this.fetching = true;
            ReviewFindAll().then(action((res) => {
                this.data = res ?? [];
                const reviewToday: ReviewData[] = [];
                let Ebbinghaus = [0, 1, 2, 4, 7, 15];
                let reviewsDay: string[] = [];
                for (let i of Ebbinghaus) {
                    reviewsDay.push(moment(Date.now() - i * 24 * 60 * 60 * 1000).format('Y-MM-DD'));
                }
                for (let i of reviewsDay) {
                    for (let j of this.data) {
                        if (i === j.date) {
                            reviewToday.push(j)
                        }
                    }
                }
                this.reviewToday = reviewToday;
            })).finally(action(() => this.fetching = false))
        }
    }

    getLastId():number{
        let ans=1;
        const temp=this.data[this.data.length-1];
        if(temp){
            for(let i of temp.ids){
                if(ans < i){
                    ans=i;
                }
            }
        }
        return ans;
    }
}

export default ReviewStore;