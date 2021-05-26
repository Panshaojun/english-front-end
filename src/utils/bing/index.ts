import axios from 'axios';
import to from 'await-to-js';
import { getAuido, Audios } from '@/utils/bing/auido';
import { getDefinition, Definition } from '@/utils/bing/definition';
import { getEnglishChinese, Dictionary } from '@/utils/bing/english-chinese-dictionary';
import { getExamples, Examples } from '@/utils/bing/example';
import { getIdioms, Idioms } from '@/utils/bing/idiom';
import { getKey, KeyWord } from '@/utils/bing/key-word';
import { getSider, Parts } from '@/utils/bing/sider';
import { getWordChange, WordChange } from '@/utils/bing/word-change';
const api = axios.create({
    baseURL: "/__bing/",
    responseType: "document"
})
export const getDom: (word: string) => Promise<HTMLDocument | undefined> = async (word: string) => {
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

type BingSearch = {
    key: KeyWord,
    definition: Definition,
    audio: Audios,
    word_change: WordChange,
    examples: Examples,
    english_chinese: Dictionary,
    idioms: Idioms,
    sider: Parts,
}
export const handleSearch: (word: string) => Promise<BingSearch | null> = async (word: string) => {
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