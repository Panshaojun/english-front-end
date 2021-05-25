type Example = {
    type: string,
    list: string[]
}
type Part = {
    title: string,
    content: Example[]
}
export type Parts = Part[]
export const getSider = (dom: HTMLDocument) => {
    const ans: Parts = [];
    const silderDom = dom.querySelector('.client_search_rightside_content');
    if (silderDom) {
        const chirden = silderDom.children;
        for (let i of chirden) {
            const silderItem: Part = {
                title: '',
                content: []
            }
            const titleDom = i.querySelector('.client_side_title');
            if (titleDom) {
                silderItem.title = titleDom.innerHTML;
            }
            const contentDom = i.querySelectorAll('.client_siderbar_content');
            silderItem.content = getExamples(contentDom);
            ans.push(silderItem);
        }
    }
    return ans;
}

const getExamples = (contentDom: NodeListOf<Element>) => {
    const examples: Example[] = [];
    for (let i of contentDom) {
        const example: Example = {
            type: "",
            list: []
        }
        const typeDom = i.querySelector('.client_siderbar_list_title');
        if (typeDom) {
            example.type = typeDom.innerHTML;
        }
        const listDom = i.querySelectorAll('.client_siderbar_list_word');
        for (let j of listDom) {
            example.list.push(j.innerHTML);
        }
        examples.push(example)
    }
    return examples;
}