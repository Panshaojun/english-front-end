import axios from 'axios';
import to from 'await-to-js';
import {ResponseType} from '@/api';
import { KaoYanBing } from '@/api/modules/server/kaoyan-bing';
import { getAuido } from '@/api/utils/bingParser/auido';
import { getDefinition } from '@/api/utils/bingParser/definition';
import { getEnglishChinese } from '@/api/utils/bingParser/english-chinese-dictionary';
import { getExamples } from '@/api/utils/bingParser/example';
import { getIdioms, } from '@/api/utils/bingParser/idiom';
import { getKey } from '@/api/utils/bingParser/key-word';
import { getSider } from '@/api/utils/bingParser/sider';
import { getWordChange } from '@/api/utils/bingParser/word-change';

const api = axios.create({
    baseURL: "/api/test/bing?word=",
    responseType: "document"
})
let domparser = new DOMParser()​​;
const getDom: (word: string) => Promise<HTMLDocument | undefined> = async (word: string) => {
    if (word === '') {
        return undefined;
    }
    word = word.replace(/\s/, '');
    const [err, res] = await to(api.get<ResponseType<string>>(word));
    if (err) {
        console.log(`抓取 ${word} 失败！`)
    } else if (res) {
        if(res.data.code===0){
            return domparser.parseFromString(res.data.data!,"text/html");
        }
    }
    return undefined;
}

export const parserBing: (word: string) => Promise<KaoYanBing | null> = async (word: string) => {
    const dom = await getDom(word);
    if (!dom) {
        return null
    }
    return {
        key: getKey(dom),
        definition: getDefinition(dom),
        audio: getAuido(dom),
        word_change: getWordChange(dom),
        examples: getExamples(dom),
        english_chinese: getEnglishChinese(dom),
        idioms: getIdioms(dom),
        sider: getSider(dom)
    };
}