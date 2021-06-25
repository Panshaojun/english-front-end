import { FC, useState,useEffect } from 'react';
import { KaoyanVocabularyData } from '@/api/modules/server/kaoyan-vocabulary';
import { observer } from 'mobx-react';
import useStores from '@/store';

const withVocabulary = (Component: FC<{ data: KaoyanVocabularyData | undefined }>) => observer(({ id, ...otherProps }: { id: number, [key: string]: any }) => {
    const [data, setData] = useState<KaoyanVocabularyData | undefined>();
    const { rootStore:{thirdPartyStore} } = useStores();
    useEffect(()=>{
        if(!data){
            setData(thirdPartyStore.getVocalbulary(id));
        }
    },[thirdPartyStore.fetching])
    
    return (<Component {...otherProps} data={data} />)
})
export default withVocabulary;