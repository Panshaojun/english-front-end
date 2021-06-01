import { observable, action,makeObservable } from 'mobx';
import { KaoYan, findAll } from '@/api/modules/server/kaoyan';
export default class KaoYanStore {
    @observable.ref
    protected __data: KaoYan[] = [];            //原始数据
    @observable
    protected __showStartIndex: number = 0;     //开始学习的下标
    @observable
    public __showLength: number = 50;           //展示的总长度

    @observable.ref
    public studyData: KaoYan[] = [];         //学习数组
    @observable
    public studyLength: number = 0;        //学习长度

    @observable.ref
    public showData: KaoYan[] = [];             //展示数组


    constructor() {
        makeObservable(this);
        findAll<KaoYan[]>().then(action((res) => {
            if (res) {
                this.__data = res;
                this.init();
            }
        }))
    }

    @action.bound init() {
        this.__showStartIndex = 0;
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
}