import Model from '@/api/utils/model';
import { Audios } from '@/api/utils/bingParser/auido';
import { Definition } from '@/api/utils/bingParser/definition';
import { Dictionary } from '@/api/utils/bingParser/english-chinese-dictionary';
import { Examples } from '@/api/utils/bingParser/example';
import { Idioms } from '@/api/utils/bingParser/idiom';
import { KeyWord } from '@/api/utils/bingParser/key-word';
import { Parts } from '@/api/utils/bingParser/sider';
import { WordChange } from '@/api/utils/bingParser/word-change';

const KaoyanBingModel = new Model('Kaoyanbing');
export type KaoYanBing = {
    key: KeyWord,
    definition: Definition,
    audio: Audios,
    word_change: WordChange,
    examples: Examples,
    english_chinese: Dictionary,
    idioms: Idioms,
    sider: Parts,
}
export type KaoYanBingData = KaoYanBing&{id:number};

export const create = (data: KaoYanBing) => {
    return KaoyanBingModel.create<KaoYanBingData>(data)
}

export const findByArray=(ids:number[])=>{
    return KaoyanBingModel.findWhere<KaoYanBingData[]>({
        where:{id:ids}
    })
}