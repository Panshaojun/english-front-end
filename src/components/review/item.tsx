import { FC } from 'react';
import { ReviewData } from '@/api/modules/server/review';
import { Row, Col, Button } from 'antd';
import useStores from '@/store';
import { useHistory } from 'react-router-dom';
const Index: FC<{ data: ReviewData }> = ({ data }) => {
    const { rootStore:{reviewStore:{getReviewData}} } = useStores();
    const history = useHistory();
    const toReview = (ids: number[]) => {
        getReviewData(ids);
        history.push('/review');
    }
    return (
        <Row style={{ flex: 1 }}>
            <Col span={8}>
                日期:{data.date}
            </Col>
            <Col span={8}>
                总计个数：{data.ids.length}
            </Col>
            <Col span={8}>
                <Button onClick={() => toReview(data.ids)}>开始复习</Button>
            </Col>
        </Row>
    )
}

export default Index;