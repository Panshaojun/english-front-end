import axios from 'axios';
import to from 'await-to-js';
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
    baseURL: "/__bing/",
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