import './index.scss';
import useStores from '@/store';
import { observer } from 'mobx-react';
import {useEffect} from 'react';
import Vocabulary from '@/components/vocabulary';
const Study = () => {
    const {ThirdPartyStore}=useStores();
    useEffect(()=>{
        ThirdPartyStore.fetch([1,2,3],()=>{})
    },[])
    return (
        <>
        {[1,2,3].map(i=>(
            <Vocabulary id={i} key={i}>
                <p>???</p>
            </Vocabulary>
        ))}
        </>
    )
}
export default observer(Study);