
import { observer } from 'mobx-react';
import { List, Row, Col, Divider } from 'antd';
import useStores from '@/store';
import Review from './review';
const ReviewToday = () => {
    const { reviewStore } = useStores();
    const { data } = reviewStore;
    return (
        <Row>
            <Col span={5}></Col>
            <Col span={14}>
                <Divider orientation="left">
                    <h1>全部复习</h1>
                </Divider>
                <Col span={24}>
                    <List size="large" dataSource={data} renderItem={item => <List.Item>
                        <Review data={item}></Review>
                    </List.Item>} />
                </Col>
            </Col>
            <Col span={5}></Col>
        </Row>
    )
}

export default observer(ReviewToday);