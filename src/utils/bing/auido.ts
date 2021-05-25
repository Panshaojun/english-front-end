type Audio = {
    title: string,  // 发音，含有音标
    url: string     // 发音文件地址
}
export type Audios = Audio[]

export const getAuido = (dom: HTMLDocument) => {
    const ans: Audios = [];
    const audios = dom.querySelectorAll('.client_def_hd_pn_list');
    for (let i of audios) {
        ans.push(paresAuido(i));
    }
    return ans;
}

const __urlRegExp = /ClientAudioPlayer\.Play\('(.*)','/;
const paresAuido = (auido: Element) => {
    const singleAudio: Audio = {
        title: '',
        url: ''
    };
    const title = auido.querySelector('.client_def_hd_pn');
    if (title) {
        singleAudio.title = title.innerHTML;
    }
    const url = auido.querySelector('.client_aud_o');
    if (url) {
        const urlStr = url.getAttribute('onmouseover');
        if (urlStr) {
            const urlMatch = urlStr.match(__urlRegExp);
            if (urlMatch) {
                singleAudio.url = urlMatch ? urlMatch[1] : '';
            }
        }
    }
    return singleAudio;
}