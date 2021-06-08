import { FC,useState,useEffect } from 'react';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { Row, Col } from 'antd';
import Vocabulary from '@/components/vocabulary';
import ChineseTranslation from '@/components/chinese-translation';
import useStores from '@/store';
import { KaoYanBingData} from '@/api/modules/server/kaoyan-bing';
import Voice from '@/components/voice';
const WordItem: FC<{
    data: KaoYan,
}> = ({ data, children }) => {
    const {getData}=useStores().bingStore;
    const [bing,setBing]=useState<KaoYanBingData|null>(null);
    const [url,setUrl]=useState<string>('');
    useEffect(()=>{
        if(!bing){
            getData(data.id,setBing);
        }
    },[data,bing,getData])
    useEffect(()=>{
        if(bing){
            setUrl(bing.audio[0].url);
        }
    },[bing])
    return (
        <Row>
            <Col span={6}>
                <Vocabulary wordId={data.id} word={data.w}>
                    {data.w}
                </Vocabulary>
            </Col>
            <Col span={2}>
                <ChineseTranslation explain={data.e}></ChineseTranslation>
            </Col>
            <Col span={2}>
                <Voice fileUrl={url}></Voice>
            </Col>
            <Col span={12}>
                {children}
            </Col>
        </Row>
    )
}

export default WordItem;