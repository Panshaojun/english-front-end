import { FC } from 'react';
import { Row, Col, Button } from 'antd';
import { KaoYan } from '@/api/modules/server/kaoyan';

const Example: FC<{ 
    data: KaoYan,
    add:()=>void
 }> = ({ data,add }) => {
    return (
        <Row>
            <Col span={1}></Col>
            <Col span={4}>{data.w}</Col>
            <Col span={17}>{data.e}</Col>
            <Col span={2}>
            <Button onClick={add}>
                添加
            </Button>
            </Col>
        </Row>
    )
}
export default Example