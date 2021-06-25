import { FC,useState,useEffect } from 'react';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { Row, Col } from 'antd';
import Vocabulary from '@/components/vocabulary';
import ChineseTranslation from '@/components/chinese-translation';
import Voice from '@/components/voice';
import useBing from '@/hooks/use-bing';
const WordItem: FC<{
    data: KaoYan,
}> = ({ data, children }) => {
    const bing=useBing(data.id);
    const [url,setUrl]=useState<string>('');
    useEffect(()=>{
        if(bing){
            if(!url){
                setUrl(bing.audio[0].url);
            }
        }
    },[bing]);

    return (
        <Row>
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
            <Col span={12}>
                {children}
            </Col>
        </Row>
    )
}

export default WordItem;