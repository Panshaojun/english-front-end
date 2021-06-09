import { FC,useState,useEffect } from 'react';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { Row, Col } from 'antd';
import useStores from '@/store';
import Vocabulary from '@/components/vocabulary';
import { KaoYanBingData} from '@/api/modules/server/kaoyan-bing';
import Voice from '@/components/voice';
const Word: FC<{
    data: KaoYan,
}> = ({ data }) => {
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
            <Col span={1}></Col>
            <Col span={2}>
                <Vocabulary wordId={data.id} word={data.w}>
                    {data.w}
                </Vocabulary>
            </Col>
            <Col span={2}>
                <Voice fileUrl={url}></Voice>
            </Col>
            <Col span={6}>{data.e}</Col>
        </Row>
    )
}

export default Word;