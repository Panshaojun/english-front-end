import { FC } from 'react';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { Row, Col } from 'antd';
import Vocabulary from '@/components/vocabulary';
const Word: FC<{
    data: KaoYan,
}> = ({ data }) => {
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={3}>
                <Vocabulary wordId={data.id}>
                    {data.w}
                </Vocabulary>
            </Col>
            <Col span={6}>{data.e}</Col>
        </Row>
    )
}

export default Word;