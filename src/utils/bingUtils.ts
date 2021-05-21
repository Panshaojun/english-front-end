import axios from 'axios';
import to from 'await-to-js';

const vocabularyApi = axios.create({
    baseURL: 'https://cn.bing.com/dict/clientsearch?mkt=zh-CN&setLang=zh&form=BDVEHC&ClientVer=BDDTV3.5.1.4320&q=',
    responseType:'document'
})

const regExps = {
    w: /<h1>(.+?)<a/,
    short: /<p class=\"short\">(.+)<\/p>/,
    long: /<p class=\"long\">(.+)<\/p>/
}

export const search = async (word: string) => {
    const [err, res] = await to(vocabularyApi.get(word));
    if (err) {
        console.log(`抓取 ${word} 失败！`)
        return null;
    }
    const data = res?.data;
    let w: string, short: string, long: string;
    try {
        w = data.match(regExps.w)[1];
        short = data.match(regExps.short)[1];
        long = data.match(regExps.long)[1];
    } catch (e) {
        console.log(`抓取 ${word} 失败！`)
        return null;
    }
    return { w, short, long };
}