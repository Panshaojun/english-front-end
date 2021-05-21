import axios from 'axios';
import to from 'await-to-js';

const vocabularyApi = axios.create({
    baseURL: 'https://www.vocabulary.com/dictionary/',
    responseType: 'text'
})

const regExps = {
    w: /<h1>(.+?)<a/,
    short: /<p class=\"short\">(.+)<\/p>/,
    long: /<p class=\"long\">(.+)<\/p>/
}

export const search = async (word: string) => {
    const [err, res] = await to(vocabularyApi.get(word));
    if (err) {
        console.log(`抓取 ${word} 失败`)
        return null;
    }
    const data = res?.data;
    let w: string, short: string, long: string;
    try {
        w = data.match(regExps.w)[1];
        short = data.match(regExps.short)[1];
        long = data.match(regExps.long)[1];
    } catch (e) {
        console.log(`抓取 ${word} 失败`)
        return null;
    }
    return { w, short, long };
}