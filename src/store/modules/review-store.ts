import { observable, action, makeObservable } from 'mobx';
import { findAll as ReviewFindAll, ReviewData } from '@/api/modules/server/review';
import { KaoYan } from '@/api/modules/server/kaoyan';
import moment from 'moment';
export default class ReviewStore {
    @observable
    reviewFetching = false;
    @observable.ref
    public data: ReviewData[] = [];         //所有复习
    @observable.ref
    public reviewToday: ReviewData[] = [];  //今日复习
    @observable
    public uploading=false;                 //上传状态

    @observable
    protected __showStartIndex: number = 0;     //开始学习的下标
    @observable
    public __showLength: number = 50;           //展示的总长度

    @observable //ref是浅观察，检测不到自身length
    public studyData: KaoYan[] = [];            //学习数组
    @observable
    public studyLength: number = 0;             //学习长度
    @observable.ref
    public showData: KaoYan[] = [];             //展示数组

    @observable.ref
    public reviewData:KaoYan[]=[];              //复习数组
    constructor() {
        makeObservable(this);
        this.fetchData();
    }

    @action.bound
    fetchData() {
        if (this.reviewFetching) {
            return;
        }
        this.reviewFetching = true;
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
        })).finally(action(() => this.reviewFetching = false))
    }

    @action.bound addShowLength(len: number) {
        if (len < 0) {
            return;
        }
        len = Math.floor(len);
        const start = this.__showStartIndex + this.__showLength;
        const end = start + len;
        const temp = [...this.showData, ...this.__data.slice(start, end)];
        this.__showLength += len;
        this.showData = temp;
    }

    @action.bound addStudyLength(len: number) {
        const ans = this.studyLength + Math.floor(len);
        if (len < 0) {
            if (ans <= 0) {
                return;
            } else if (ans < this.studyData.length) {
                const temp = [...this.studyData];
                this.studyData = temp.splice(0, ans);
                const temp2 = [...this.showData, ...temp];
                temp2.sort((a, b) => a.id - b.id);
                this.showData = temp2;
            }
        }
        this.studyLength = ans;
    }

    @action.bound
    uploadReview(){

    }


}