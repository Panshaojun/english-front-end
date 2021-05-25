type KeyWord=string;

export const getKey:(dom: HTMLDocument)=>KeyWord=(dom: HTMLDocument)=>{
    const key= dom.querySelector('.client_def_hd_hd');
    return key?key.innerHTML:'';
}