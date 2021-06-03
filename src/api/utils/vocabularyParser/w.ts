export type W=string;

export const getW = (dom: HTMLDocument) => {
    let ans: W="";
    const wDom = dom.querySelector('.word-area h1');
    if(wDom){
        ans=wDom.innerHTML;
    }
    return ans;
}