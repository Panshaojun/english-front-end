type Audio={
    title:string,
    url:string
}[]

const __urlRegExp=/ClientAudioPlayer\.Play\('(.*)','/;
export const getAuido=(dom:HTMLDocument)=>{
    const ans:Audio=[];
    const audios=dom.querySelectorAll('.client_def_hd_pn_list');
    for(let i of audios){
        const singleAudio={
            title:'',
            url:''
        };
        const title=i.querySelector('.client_def_hd_pn');
        if(title){
            singleAudio.title=title.innerHTML;
        }
        const url=i.querySelector('.client_aud_o');
        if(url){
            const urlStr=url.getAttribute('onmouseover');
            if(urlStr){
               singleAudio= urlStr.match(__urlRegExp)[1]?urlStr.match(__urlRegExp)[1]:''
            }

        }
        audioInfo.head=.innerHTML;
        let urlStr=.getAttribute('onmouseover').match(__urlRegExp);
        audioInfo.url=urlStr?urlStr[1]:'';
        ans.push(audioInfo);
    }
    return ans;
}