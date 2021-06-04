import { FC } from 'react';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { Row, Col } from 'antd';
import Vocabulary from '@/components/vocabulary';

const WordItem: FC<{
    data: KaoYan,
}> = ({ data, children }) => {
    return (
        <Row>
            <Col span={4}>
                <Vocabulary wordId={data.id} word={data.w}>
                    {data.w}
                </Vocabulary>
            </Col>
            <Col span={17}>{data.e}</Col>
            <Col span={3}>
                {children}
            </Col>
        </Row>
    )
}

export default WordItem;