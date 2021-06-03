export type Short=string;

export const getShort = (dom: HTMLDocument) => {
    let ans: Short="";
    const shortDom = dom.querySelector('.long');
    if(shortDom){
        ans=shortDom.innerHTML;
    }
    return ans;
}