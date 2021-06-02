import { observable, action, makeObservable } from 'mobx';
import { findAll as ReviewFindAll, ReviewData } from '@/api/modules/server/review';
import moment from 'moment';
export default class ReviewStore {
    @observable.ref
    private __data: ReviewData[] = [];
    @observable.ref
    public reviewToday: ReviewData[] = [];
    constructor() {
        makeObservable(this);
        this.fetchData();
    }
    @action.bound
    fetchData() {
        ReviewFindAll().then(action((res) => {
            this.__data = res ?? [];
            const reviewToday:ReviewData[]=[];
            let Ebbinghaus = [0, 1, 2, 4, 7, 15];
            let reviewsDay:string[] = [];
            for (let i of Ebbinghaus) {
                reviewsDay.push(moment(Date.now() - i * 24 * 60 * 60 * 1000).format('Y-MM-DD'));
            }
            for(let i of reviewsDay){
                for(let j of this.__data){
                    if(i===j.date){
                        reviewToday.push(j)
                    }
                }
            }
            this.reviewToday=reviewToday;
        }))
    }
}