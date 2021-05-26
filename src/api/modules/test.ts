import { api } from '@/api';
import { to } from 'await-to-js';

export const fetchFile = async (fileStr: string) => {
    return '';
    if (fileStr === '') {
        return false;
    }
    const fileUrl = fileStr;
    const temp=fileStr.split('/');
    if(temp.length<5){
        return false;
    }
    const fileName = fileStr.split('/').slice(5).join('');
    if (fileUrl && fileName) {
        const [e, data] = await to(api.post('test/fetchfile', { fileName, fileUrl }));
        if (e) {
            console.log(e);
            return false;
        } else {
            const { code } = data?.data;
            if (code === 0) {
                return true;
            } else {
                return false;
            }
        }
    }else{
        return false;
    }
}