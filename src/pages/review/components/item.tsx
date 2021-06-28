import { FC,useState,useEffect } from 'react';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { Row, Col } from 'antd';
import Vocabulary from '@/components/vocabulary';
import ChineseTranslation from '@/components/chinese-translation';
import Voice from '@/components/voice';
import useBing from '@/hooks/use-bing';
import { observer } from 'mobx-react';
const Item: FC<{
    data: KaoYan,
}> = ({ data }) => {
    const bing=useBing(data.id);
    const [url,setUrl]=useState<string>('');
    useEffect(()=>{
        if(bing){
            if(!url){
                setUrl(bing.audio[0].url);
            }
        }
    },[bing,url]);

    return (
        <Row>
            <Col span={1}></Col>
            <Col span={6}>
                <Vocabulary id={data.id}>
                    {data.w}
                </Vocabulary>
            </Col>
            <Col span={2}>
                <ChineseTranslation explain={data.e}></ChineseTranslation>
            </Col>
            <Col span={2}>
                <Voice fileUrl={url}></Voice>
            </Col>
        </Row>
    )
}

export default observer(Item);