import { observable, action, makeObservable } from 'mobx';
import { findAll as ReviewFindAll, ReviewData } from '@/api/modules/server/review';
import to from 'await-to-js';
import moment from 'moment';
import RootStore from './root-store';
class ReviewStore {
    @observable fetching = false;
    callBacks: Function[] = [];
    @observable public uploading = false;                   //上传状态
    @observable.ref public data: ReviewData[] = [];         //所有复习
    @observable.ref public reviewToday: ReviewData[] = [];  //今日复习

    constructor(private rootStore:RootStore) {
        makeObservable(this);
        this.fetch();
    }

    @action private setData(data: ReviewData[]) {
        this.data = data;
    }

    @action private setFetching(fetching: boolean) {
        this.fetching=fetching;
    }

    @action private setUploading(uploading: boolean) {
        this.uploading=uploading;
    }

    @action private getReviewToday(){
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
    }
    
    public async fetch() {
        if (this.fetching) return;
        this.setFetching(true);
        const [err, data] = await to(ReviewFindAll());
        if (err) {
            alert("获取复习数据失败！");
        }
        this.setData(data ?? []);
        this.setFetching(false);
        this.getReviewToday();
    }
}

export default ReviewStore;