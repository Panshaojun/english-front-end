import {FC} from 'react';
import { ReviewData } from '@/api/modules/server/review';
import {  Row, Col,Button } from 'antd';
const Review:FC<{data:ReviewData}>=({data})=>{
    return (
        <Row>
            <Col span={8}>
                日期:{data.date}
            </Col>
            <Col span={8}>
                总计个数：{data.ids.length}
            </Col>
            <Col span={8}>
                <Button>开始复习</Button>
            </Col>
        </Row>
    )
}

export default Review;