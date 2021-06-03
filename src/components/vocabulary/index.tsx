import { FC, useState,useEffect } from 'react';
import { Popover } from 'antd';
import useStores from '@/store';
import { KaoyanVocabularyData } from '@/api/modules/server/kaoyan-vocabulary';
import './index.scss';
const Vocabulary: FC<{wordId:number}> = ({ wordId,children }) => {
    const [data, setData] = useState<KaoyanVocabularyData>({
        id: 0,
        w: '未找到数据',
        short: '...',
        long: '...'
    });
    const {vocalbularyStore}=useStores();
    useEffect(()=>{
        vocalbularyStore.getById(wordId,setData)
    },[wordId]);
    const content = (
        <div className="c-vocabulary">
            <h2>{data.w}</h2>
            <p dangerouslySetInnerHTML={{__html:data.short}}></p>
            <p dangerouslySetInnerHTML={{__html:data.long}}></p>
        </div>
    );
    return (
        <Popover content={content} title="vocabulary词典">
            <div className="c-vocabulary-indicator">{children}</div>
        </Popover>
    )
}

export default Vocabulary;