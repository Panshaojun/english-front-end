import { observer } from 'mobx-react';
import { List, Row, Col, Divider } from 'antd';
import Item from './item';
import {FC} from 'react';
import { ReviewData } from '@/api/modules/server/review';
const Review:FC<{data:ReviewData[],title:string}> = ({data,title}) => {
    return (
        <Row>
            <Col span={5}></Col>
            <Col span={14}>
                <Divider orientation="left">
                    <h1>{title}</h1>
                </Divider>
                <Col span={24}>
                    <List size="large" dataSource={data} renderItem={item => <List.Item>
                        <Item data={item}></Item>
                    </List.Item>} />
                </Col>
            </Col>
            <Col span={5}></Col>
        </Row>
    )
}

export default observer(Review);