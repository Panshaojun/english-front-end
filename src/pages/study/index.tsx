import { Row, Col,Button } from 'antd';
import { observer } from 'mobx-react';
import Example from './Example';
import useStores from '@/store';
import './index.scss'

const Study = () => {
    const { data,addShowLength } = useStores().kaoyanStore;
    return (
        <>
            <Row className="study-top">
                <Col span={1}>
                </Col>
                <Col span={11}>
                <Button type="primary" onClick={()=>addShowLength(10)}>添加10个</Button>
                </Col>
                <Col span={12}>

                </Col>
            </Row>
            <Row>
                <Col span={18}>
                    <ol>
                        {data.map((i) => {
                            return (
                                <li key={i.id}>
                                    <Example data={i} ></Example>
                                </li>
                            )
                        })}
                    </ol>
                </Col>
                <Col span={6}></Col>
            </Row>
        </>
    )
}

export default observer(Study);