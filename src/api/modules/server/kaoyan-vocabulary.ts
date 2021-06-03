import Model from '@/api/utils/model';
import { Long } from '@/api/utils/vocabularyParser/long';
import { Short } from '@/api/utils/vocabularyParser/short';
import { W } from '@/api/utils/vocabularyParser/w';
const KaoyanVocabularyModel = new Model('kaoyanvocabulary');
export type KaoyanVocabulary={
    w:W,
    short:Short,
    long:Long
}
export type KaoyanVocabularyData=KaoyanVocabulary&{id:number}
export const create=(req:KaoyanVocabularyData)=>{
    return KaoyanVocabularyModel.create<KaoyanVocabularyData>(req);
}
export const findOne=(id:number)=>{
    return KaoyanVocabularyModel.findOne<KaoyanVocabularyData>(id)
}

