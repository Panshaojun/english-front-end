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
        const dom = await getDom("word");
        if (dom) {
            console.log("关键词", getKey(dom));
            console.log("定义", getDefinition(dom));
            console.log("声音", getAuido(dom));
            console.log("词性转换", getWordChange(dom));
            console.log("例子", getExamples(dom));
            console.log("英汉", getEnglishChinese(dom));
            console.log("成语", getIdioms(dom));
            console.log("侧边栏", getSider(dom));
            
        }
    }
    return (
        <div>
            <button onClick={handleClick}>测试</button>
        </div>
    )
}
export default Study;