import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
import Example from './Example';
import useStores from '@/store';

const Study = () => {
    const { data } = useStores().kaoyanStore;
    return (
        <Row>
            <Col span={12}>
                {data.map((i) => {
                    return <Row key={i.id}>
                        <Example data={i} ></Example>
                    </Row>
                })}
            </Col>
            <Col span={12}></Col>
        </Row>
    )
}

export default observer(Study);