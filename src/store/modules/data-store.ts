import { observable, action, makeObservable } from 'mobx';
import { KaoYan, findAll as KaoyanFindAll } from '@/api/modules/server/kaoyan';
import { KaoyanVocabularyData, findByArray as findVocabularys } from '@/api/modules/server/kaoyan-vocabulary';
import { KaoYanBingData, findByArray as findBings } from '@/api/modules/server/kaoyan-bing';

//单词、第三方单词
export default class VocalbularyStore {
    @observable
    thirdPartyDataFetching = false;
    @observable
    dataFetching = false;

    @observable.ref
    private data:KaoYan[]=[]

    
    @observable.ref
    private thirdPartyDataIds: number[] = [];
    @observable.ref
    private bing: KaoYanBingData[] = [];
    @observable.ref
    private vocalbulary: KaoyanVocabularyData[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    init(){
        let temp=localStorage.getItem('data')||false;
        if(temp){
            console.log("本地获取了data");
            this.data=JSON.parse(temp);
        }else{
            this.fetchKaoYan();
        }
    }

    @action.bound
    fetchKaoYan(){
        if(this.dataFetching){
            return;
        }
        this.dataFetching=true;
        KaoyanFindAll<KaoYan[]>().then(action(res=>{
            if(res){
                this.data=res;
                localStorage.setItem('data',JSON.stringify(res));
            }
        })).finally(action(()=>{
            this.dataFetching=false;
        }))
    }

    @action.bound
    fetchThirdPartyData(ids: number[]) {
        this.thirdPartyDataFetching = true;
        const notRepetitiveIds = new Set([...this.thirdPartyDataIds, ...ids]);
        if (notRepetitiveIds.size === this.thirdPartyDataIds.length) {
            this.thirdPartyDataFetching = false;
            return;
        }
        const allIds = [...notRepetitiveIds];
        const fetchIds = allIds.slice(this.thirdPartyDataIds.length)
        Promise.all([
            findBings(fetchIds),
            findVocabularys(fetchIds)
        ]).then(action(([r1, r2]) => {
            this.thirdPartyDataIds = allIds;
            if (r1) {
                this.bing = [...this.bing, ...r1];
            }
            if (r2) {
                this.vocalbulary = [...this.vocalbulary, ...r2];
            }
        })).finally(action(() => {
            this.thirdPartyDataFetching = false;
        }))
    }

    @action.bound
    getBing(id: number, setCall: (data: KaoYanBingData) => void) {
        const ans=this.bing.find(i=>i.id===id);
        ans && setCall(ans);
    }

    @action.bound
    getVocalbulary(id: number, setCall: (data: KaoyanVocabularyData) => void) {
        const ans=this.vocalbulary.find(i=>i.id===id);
        ans && setCall(ans);
    }
    
}