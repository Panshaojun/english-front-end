import { observable, action, when, makeObservable } from 'mobx';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { create } from '@/api/modules/server/review';
import RootStore from './root-store';
import moment from 'moment';
class StudyStore {
    @observable public uploading: boolean = false;
    @observable private __showStartIndex: number = 0;       //开始学习的下标
    @observable private __showLength: number = 50;          //展示的总长度
    @observable.ref public studyData: KaoYan[] = [];        //学习数组
    @observable public studyLength: number = 50;             //学习长度
    @observable.ref public showData: KaoYan[] = [];         //展示数组
    @observable.ref public deletedData: KaoYan[] = [];
    constructor(private rootStore: RootStore) {
        makeObservable(this);
        when(
            () => (!rootStore.dataStore.fetching) && (!rootStore.reviewStore.fetching),// 两个数据都已经加载完毕
            () => this.initData()
        )
    }

    @action private initShowStartIndex() {
        let maxId = 1;
        const data = this.rootStore.reviewStore.data;
        console.log(data);
        const temp = data[data.length - 1];
        if (temp) {
            for (let i of temp.ids) {
                if (maxId < i) {
                    maxId = i;
                }
            }
        }
        let index = this.rootStore.dataStore.data.findIndex(i => i.id === maxId);
        console.log(index);
        this.__showStartIndex = index === -1 ? 0 : index;
    }

    @action private initData() {
        console.log("初始化学习数据！");
        this.__showLength = 50;
        this.studyData = [];
        this.studyLength = 50;
        this.deletedData = [];
        this.initShowStartIndex();
        const data = this.rootStore.dataStore.data;
        this.showData = data.slice(this.__showStartIndex, this.__showStartIndex + this.__showLength);
        this.asyncThirdPartyDatas(this.showData);
    }

    private asyncThirdPartyDatas(data: KaoYan[]) {
        this.rootStore.thirdPartyStore.fetch(data.map(i => i.id));
    }

    @action.bound public addStudy(id: number) {
        const index = this.showData.findIndex(i => i.id === id);
        if (index !== -1 && (this.studyData.length !== this.studyLength)) {
            const temp = [...this.studyData, this.showData[index]];
            temp.sort((a, b) => a.id - b.id);
            console.log(temp);
            this.studyData = temp;
            this.showData.splice(index, 1);
        }
    }

    @action.bound public delStudy(id: number) {
        const index = this.studyData.findIndex(i => i.id === id);
        if (index !== -1) {
            const temp = [...this.showData, this.studyData[index]];
            temp.sort((a, b) => a.id - b.id);
            this.showData = temp;
            this.studyData.splice(index, 1);
        }
    }

    @action.bound public delShow(id: number) {
        const index = this.showData.findIndex(i => i.id === id);
        if (index !== -1) {
            this.deletedData = [...this.deletedData, ...this.showData.splice(index, 1)];
            this.showData = [...this.showData]
        }
    }

    @action.bound public addShowLength(len: number) {
        if (len < 0) {
            return;
        }
        len = Math.floor(len);
        const start = this.__showStartIndex + this.__showLength;
        const end = start + len;
        const data = this.rootStore.dataStore.data;
        const addDatas = data.slice(start, end);
        this.asyncThirdPartyDatas(addDatas);
        const temp = [...this.showData, ...addDatas];
        this.__showLength += len;
        this.showData = temp;
    }

    @action.bound public addStudyLength(len: number) {
        const ans = this.studyLength + len;
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

    @action.bound public uploadReview() {
        this.uploading = true;
        const ids: number[] = [];
        for (let i of this.studyData) {
            ids.push(i.id);
        }
        const date = moment().format('Y-MM-DD');
        create({
            date,
            ids
        }).then(() => {
            this.rootStore.reviewStore.fetch();
        }).finally(action(() => this.uploading = false))
    }
}

export default StudyStore;