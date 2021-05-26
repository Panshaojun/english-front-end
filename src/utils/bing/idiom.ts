type Idiom = {
    key: string,
    list: string[]
}
export type Idioms = Idiom[]

export const getIdioms = (dom: HTMLDocument) => {
    const ans: Idioms = [];
    const idiomDom = dom.querySelector('.idomseg');
    if (idiomDom) {
        const childs = idiomDom.children;
        for (let i = 0, len = childs.length / 2; i < len; i++) {
            let keyDom = null, valDom = null, examItem = null;
            keyDom = childs[i * 2]?.querySelector('.defitemtitle');
            valDom = childs[i * 2 + 1]?.querySelector('.defitemcon');
            examItem = childs[i * 2 + 1]?.querySelectorAll('.examitem');
            ans.push(getIdiom(keyDom, valDom, examItem));
        }
    }
    return ans;
}

/**
 * 
 * @param keyDom 关键词
 * @param valDom 例子
 * @param examItem 额外的例子
 */
const getIdiom = (keyDom: Element | null, valDom: Element | null, examItem: NodeListOf<Element>) => {
    const ans: Idiom = {
        key: '',
        list: []
    }
    if (keyDom) {
        ans.key = keyDom.innerHTML;
    }
    if (valDom) {
        ans.list.push(valDom.innerHTML);
    }
    if (examItem && examItem.length) {
        for (let j of examItem) {
            ans.list.push(j.innerHTML);
        }
    }
    return ans;
}
