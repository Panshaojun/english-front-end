export type WordChange={
    key:string,
    val:string
}[]
export const getWordChange=(dom: HTMLDocument)=>{
    const ans:WordChange=[];
    const def=dom.querySelector('.client_word_change_def');
    if(!def){
        return ans;
    }
    const wcs=def.querySelectorAll('.client_word_change_word');
    for(let i of wcs){
        const wc={
            key:'',
            val:''
        }
        wc.key=i.getAttribute('title')||'';
        wc.val=i.innerHTML;
        ans.push(wc)
    }
    return ans;
}