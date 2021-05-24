type Example = {
    en: string, //英文的innerHTML，带key样式是重点单词
    cn: string //中文，同上
}
export type Examples = Example[]

//获取dom的所有例子
export const getExamples = (dom: HTMLDocument) => {
    const examplesDom = dom.querySelectorAll('.client_sentence_list');
    const examples: Examples = [];
    for (let example of examplesDom) {
        let enDom: any = example.querySelector('.client_sen_en');
        let cnDom: any = example.querySelector('.client_sen_cn');
        if (enDom && cnDom) {
            examples.push(handleEnAndCn(enDom, cnDom))
        }
    }
    return examples;
}

const handleEnAndCn: (enDom: HTMLDocument, cnDom: HTMLDocument) => Example = (enDom: HTMLDocument, cnDom: HTMLDocument) => {
    let enDomChilden = enDom.children; //childNodes can contain [non-element nodes](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)，
    let cnDomChilden = cnDom.children; //不要用childNodes，因为它包括非元素节点
    let en = '', cn = '';
    for (let j of enDomChilden) {
        if (j.className === 'client_sentence_search') {
            en += `<span class="key">${j.innerHTML}</span>`
        } else {
            en += j.innerHTML;
        }
    }
    for (let j of cnDomChilden) {
        if (j.className === 'client_sentence_search') {
            cn += `<span class="key">${j.innerHTML}</span>`
        } else {
            cn += j.innerHTML;
        }
    }
    return { en, cn };
}