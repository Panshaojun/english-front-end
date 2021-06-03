import { observable, action, makeObservable } from 'mobx';
import { KaoyanVocabularyData,findOne } from '@/api/modules/server/kaoyan-vocabulary';

export default class VocalbularyStore{
    @observable.ref
    private ___data:KaoyanVocabularyData[]=[]
    constructor(){
        makeObservable(this);
    }

    @action.bound
    getById(id:number,setState:(data:KaoyanVocabularyData)=>void){
        const find1=this.___data.find(i=>i.id===id);
        if(find1){
            setState(find1)
        }else{
            findOne(id).then(action((data)=>{
                if(data){
                    const find2=this.___data.find(i=>i.id===id);    //再次检查，防止多次存放进内存
                    if(!find2){
                        this.___data=[...this.___data,data];
                        setState(data);
                    }else{
                        setState(find2);
                    }
                }else{
                    console.log("捕捉到错误了1")
                }
            })).catch(err=>{
                console.log("捕捉到错误了2")
            })
        }
    }
}