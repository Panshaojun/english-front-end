import { observable, action, makeObservable } from 'mobx';
import { KaoYan, findAll as KaoyanFindAll } from '@/api/modules/server/kaoyan';
import { create, findAll as ReviewFindAll, ReviewData } from '@/api/modules/server/review';
import moment from 'moment';
export default class KaoYanStore {
    @observable.ref
    protected __data: KaoYan[] = [];            //原始数据
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

    @observable
    public loading = false;


    constructor() {
        makeObservable(this);
        this.fetchData();
    }

    fetchData() {
        if (this.__data.length) {
            ReviewFindAll().then(action((res) => {
                this.findShowStartIndex(res ?? []);
            })).finally(() => this.init());
        } else {
            Promise.all([
                KaoyanFindAll<KaoYan[]>(),
                ReviewFindAll()
            ]).then(action(([res1, res2]) => {
                this.__data = res1 ?? [];
                this.findShowStartIndex(res2 ?? []);
            })).finally(() => this.init());
        }
    }

    findShowStartIndex(reviewData:ReviewData[]){
        let showStartIndex: number = 0;
        if (reviewData.length) {
            const lastReview = reviewData[reviewData.length - 1];
            if (lastReview.ids.length) {
                const id = lastReview.ids[lastReview.ids.length - 1];
                let tempIndex = this.__data.findIndex(i => i.id === id);
                if (tempIndex !== -1) {
                    showStartIndex = tempIndex + 1;
                }
            }
        }
        this.__showStartIndex = showStartIndex;
    }

    @action.bound init() {
        this.__showLength = 50;
        this.showData = this.__data.slice(this.__showStartIndex, this.__showStartIndex + this.__showLength);
        this.studyLength = 50;
        this.studyData = [];
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

    @action.bound addStudy(id: number) {
        const index = this.showData.findIndex(i => i.id === id);
        if (index !== -1 && (this.studyData.length !== this.studyLength)) {
            const temp = [...this.studyData, this.showData[index]];
            temp.sort((a, b) => a.id - b.id);
            this.studyData = temp;
            this.showData.splice(index, 1);
        }
    }

    @action.bound delStudy(id: number) {
        const index = this.studyData.findIndex(i => i.id === id);
        if (index !== -1) {
            const temp = [...this.showData, this.studyData[index]];
            temp.sort((a, b) => a.id - b.id);
            this.showData = temp;
            this.studyData.splice(index, 1);
        }
    }

    @action.bound upload() {
        this.loading = true;
        const ids: number[] = [];
        for (let i of this.studyData) {
            ids.push(i.id);
        }
        const date = moment().format('Y-MM-DD');
        create({
            date,
            ids
        }).then(() => {
            this.fetchData();
        }).finally(action(() => this.loading = false))
    }
}