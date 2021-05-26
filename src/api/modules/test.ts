import {api} from '@/api';

export const fetchFile=(fileStr:string)=>{
    if(fileStr===''){
        return;
    }
    const fileUrl=fileStr;
    const fileName=fileStr.split('/').slice(5).join('');
    if(fileUrl&&fileName){
        api.post("fetchfile",{fileUrl,fileName})
    }
}