import axios from 'axios';
import to from 'await-to-js';

const api = axios.create({
    baseURL: "/__bing/",
    responseType: "document"
})

export const getDom:(word:string)=>Promise<HTMLDocument|undefined> = async (word:string) => {
    if(word===''){
        return undefined;
    }
    word=word.replace(/\s/,'');
    const [err, res] = await to(api.get<HTMLDocument>(word));
    if (err) {
        console.log(`抓取 ${word} 失败！`)
        return undefined;
    } else if(res) {
        return res.data;
    }
}