import { fetchFile } from '@/api/modules/test';
import { create } from '@/api/modules/kaoyan-bing';
import { KaoyanModel } from '@/api/modules/kaoyan';
import {KaoyanBingModel} from '@/api/modules/kaoyan-bing';
import to from "await-to-js";
import { getDom } from '@/utils/bing';
import { getAuido } from '@/utils/bing/auido';
import { getDefinition } from '@/utils/bing/definition';
import { getEnglishChinese } from '@/utils/bing/english-chinese-dictionary';
import { getExamples } from '@/utils/bing/example';
import { getIdioms } from '@/utils/bing/idiom';
import { getKey } from '@/utils/bing/key-word';
import { getSider } from '@/utils/bing/sider';
import { getWordChange } from '@/utils/bing/word-change';

const Study = () => {
    const handleClick = async () => {
        const [err1, kaoyanData] = await to(KaoyanModel.findWhere<{ id: number, w: string }[]>({
            "select": "id,w",
            "limit": "5500"
        }))
        if (err1 || (!kaoyanData)) {
            return console.log("获取数据失败");
        }
        const [err2,kaoyanbingData]=await to(KaoyanBingModel.findWhere<{id:number}[]>({
            "select": "id",
            "limit": "5500"
        }))
        if(err2||!kaoyanbingData){
            return console.log("获取数据失败2");
        }
        const unRecordKaoyan=kaoyanData.filter(item=>{
            let notRecord=true;
            for(let j of kaoyanbingData){
                if(item.id===j.id){
                    notRecord=false;
                }
            }
            return notRecord;
        })
        return console.log(unRecordKaoyan);
        const handleSearch=async (id:number,word:string)=>{
            const dom=await getDom(word);
            if (dom) {
                const audios=getAuido(dom);
                for(let audio of audios){
                    fetchFile(audio.url);
                }
                create(
                    id,
                    getKey(dom),
                    JSON.stringify(getDefinition(dom)),
                    JSON.stringify(audios),
                    JSON.stringify(getWordChange(dom)),
                    JSON.stringify(getExamples(dom)),
                    JSON.stringify(getEnglishChinese(dom)),
                    JSON.stringify(getIdioms(dom)),
                    JSON.stringify(getSider(dom))
                )
            }else{
                console.log(`id「${id}」单词抓取失败：${word}`);
            }
        }
        let i = 0;
        let timer: NodeJS.Timeout | null = setInterval(() => {
            if (i === unRecordKaoyan.length) {
                if (timer) {
                    clearInterval(timer);
                }
                timer = null;
                alert("获取数据完毕")
            }
            const {id,w:word}=unRecordKaoyan[i];
            handleSearch(id,word);
            i++;
        }, 2000)
    }
    return (
        <div>
            <button onClick={handleClick}>测试</button>
        </div>
    )
}
export default Study;