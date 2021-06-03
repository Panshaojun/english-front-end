export type W=string;

export const getW = (dom: HTMLDocument) => {
    let ans: W="";
    const wDom = dom.querySelector('.word-area h1');
    if(wDom){
        const c=wDom.firstChild;
        if(c){
            ans=c.nodeValue??"获取名称失败";
        }
    }
    return ans;
}