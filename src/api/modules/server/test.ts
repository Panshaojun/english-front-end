import { api } from '@/api';
import { to } from 'await-to-js';

export const fetchFile = async (fileStr: string) => {
    if (fileStr === '') {
        return null;
    }
    const fileUrl = fileStr;
    const temp=fileStr.split('/');
    if(temp.length<5){
        return null;
    }
    const fileName = fileStr.split('/').slice(5).join('');
    console.log(fileName)
    console.log(fileUrl)
    if (fileUrl && fileName) {
        const [e, data] = await to(api.post('test/fetchfile', { fileName, fileUrl }));
        if (e) {
            return null;
        } else {
            const { code,data:url } = data?.data;
            if (code === 0) {
                return url as string;
            } else {
                return null;
            }
        }
    }else{
        return null;
    }
}