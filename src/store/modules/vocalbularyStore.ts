import { observable, action, makeObservable } from 'mobx';
import { KaoyanVocabularyData,findOne,create } from '@/api/modules/server/kaoyan-vocabulary';
import {parserVocabulary} from '@/api/modules/others/vocabulary';

export default class VocalbularyStore{
    @observable.ref
    private ___data:KaoyanVocabularyData[]=[]
    constructor(){
        makeObservable(this);
    }

    @action.bound
    getVocalbulary(id:number,word:string,setState:(data:KaoyanVocabularyData)=>void){
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
                    parserVocabulary(word).then(res1=>{
                        if(res1){
                            create({...res1,id}).then(res2=>{
                                if(res2){
                                    this.___data=[...this.___data,res2];
                                    setState(res2);
                                }
                            })
                        }
                    })
                }
            })).catch(err=>{
                console.log("捕捉到错误了2")
            })
        }
    }

}