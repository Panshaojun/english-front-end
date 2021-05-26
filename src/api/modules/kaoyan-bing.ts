import Model from '@/api/utils/model';
import {ResponseType} from '@/api';
export const KaoyanBingModel=new Model('Kaoyanbing');

export const create = (
    id: number,
    key: string,
    definition: string,
    audio: string,
    word_change: string,
    examples: string,
    english_chinese: string,
    idioms: string,
    sider: string,
)=>{
   return  KaoyanBingModel.create<ResponseType<string>>({
    id,
    key,
    definition,
    audio,
    word_change,
    examples,
    english_chinese,
    idioms,
    sider,
   })
}