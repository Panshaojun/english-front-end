type Example = {
    english_words: string,       //英语单词
    chinese_explanation: string  //中文解释
}
type EnglishChinese = {
    type: string,    //单词类型
    examples: Example[]
}
export type Dictionary = EnglishChinese[]

export const getEnglishChinese = (dom: HTMLDocument) => {
    const ans: Dictionary = [];
    const area_childen = dom.querySelectorAll('.defeachseg');
    for (let i of area_childen) {
        const temp: EnglishChinese = {
            type: '',
            examples: [],
        }
        const typeDom = i.querySelector('.defpos');
        if (typeDom) {
            temp.type = typeDom.innerHTML;
        }
        const exampleDoms = i.querySelectorAll('.deflistitem');
        for (let exampleDom of exampleDoms) {
            const example: Example = {
                english_words: '',
                chinese_explanation: ''
            }
            const enDom = exampleDom.querySelector('.defitemtitle');
            if (enDom) {
                example.english_words = enDom.innerHTML;
            }
            const chDom = exampleDom.querySelector('.defitemcon');
            if (chDom) {
                example.chinese_explanation = chDom.innerHTML;
            }
            temp.examples.push(example);
        }
        ans.push(temp);
    }
    return ans;
}