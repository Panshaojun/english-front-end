import './index.scss';
import useStores from '@/store';
import {useEffect} from 'react';
import Vocabulary from '@/components/vocabulary';
import withVocabulary from '@/hoc/with-vocabulary';
const Study = () => {
    const {store:{thirdPartyData:{fetch,fetching}}}=useStores();
    useEffect(()=>{
        fetch([1,2,3],()=>{})
    },[])
    return fetching?(
        <span>抓取中</span>
    ):(
       [1,2,3].map(i=>withVocabulary(Vocabulary,i)
       )
    )
}

export default Study;