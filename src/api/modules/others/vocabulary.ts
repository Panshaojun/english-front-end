import axios from 'axios';
import to from 'await-to-js';
import { KaoyanVocabulary } from '@/api/modules/server/kaoyan-vocabulary';
import { getLong } from '@/api/utils/vocabularyParser/long';
import { getShort } from '@/api/utils/vocabularyParser/short';
import { getW } from '@/api/utils/vocabularyParser/w';

const api = axios.create({
    baseURL: "/__vocabulary/",
    responseType: "document"
})

const getDom: (word: string) => Promise<HTMLDocument | undefined> = async (word: string) => {
    if (word === '') {
        return undefined;
    }
    word = word.replace(/\s/, '');
    const [err, res] = await to(api.get<HTMLDocument>(word));
    if (err) {
        console.log(`抓取 ${word} 失败！`)
        return undefined;
    } else if (res) {
        return res.data;
    }
}

export const parserVocabulary: (word: string) => Promise<KaoyanVocabulary | null> = async (word: string) => {
    const dom = await getDom(word);
    if (!dom) {
        return null
    }
    return {
        w:getW(dom),
        short:getShort(dom),
        long:getLong(dom)
    };
}