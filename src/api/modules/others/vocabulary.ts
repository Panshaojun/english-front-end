import axios from 'axios';
import to from 'await-to-js';
import { ResponseType } from '@/api/utils/common-api';
import { KaoyanVocabulary } from '@/api/modules/server/kaoyan-vocabulary';
import { getLong } from '@/api/utils/vocabularyParser/long';
import { getShort } from '@/api/utils/vocabularyParser/short';
import { getW } from '@/api/utils/vocabularyParser/w';

const api = axios.create({
    baseURL: "/test/vocabulary/word=",
    responseType: "document"
})
let domparser = new DOMParser();
const getDom: (word: string) => Promise<HTMLDocument | undefined> = async (word: string) => {
    if (word === '') {
        return undefined;
    }
    word = word.replace(/\s/, '');
    const [err, res] = await to(api.get<ResponseType<string>>(word));
    if (err) {
        console.log(`抓取 ${word} 失败！`)
    } else if (res) {
        if (res.data.code === 0) {
            return domparser.parseFromString(res.data.data!, "text/html");
        }
    }
    return undefined;
}

export const parserVocabulary: (word: string) => Promise<KaoyanVocabulary | null> = async (word: string) => {
    const dom = await getDom(word);
    if (!dom) {
        return null
    }
    return {
        w: getW(dom),
        short: getShort(dom),
        long: getLong(dom)
    };
}