export type Long=string;

export const getLong = (dom: HTMLDocument) => {
    let ans: Long="";
    const longDom = dom.querySelector('.long');
    if(longDom){
        ans=longDom.innerHTML;
    }
    return ans;
}