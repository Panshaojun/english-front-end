export type Definition = {
    title: string;  // 单词类型
    item: string;   // 解释
}[]
export const getDefinition = (dom: HTMLDocument) => {
    const ans: Definition = [];
    const container = dom.querySelector('.client_def_container');
    if (!container) {
        return []
    }
    const titles = container.querySelectorAll('.client_def_title_bar');
    const items = container.querySelectorAll(".client_def_list_word_bar");
    for (let i = 0, len = titles.length; i < len; i++) {
        const singleDefine = {
            title: '',
            item: ''
        }
        singleDefine.title = titles[i].innerHTML;
        singleDefine.item = items[i].innerHTML;
        ans.push(singleDefine);
    }
    return ans;
}