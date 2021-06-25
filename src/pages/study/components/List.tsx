import Item from './Item';
import { Row, Col, Button } from 'antd';
import { observer } from 'mobx-react';
import useStores from '@/store';
const WordShow = () => {
    const { showData, studyData, addStudy, delStudy, delShow } = useStores().rootStore.studyStore;
    return (
        <Row>
            <Col span={12}>
                <ol>
                    {showData.map((i) => {
                        return (
                            <li key={i.id}>
                                <Item data={i} >
                                    <Row>
                                        <Col span={12}>
                                            <Button onClick={() => delShow(i.id)}>
                                                我认识
                                        </Button>
                                        </Col>
                                        <Col span={12}>
                                            <Button onClick={() => addStudy(i.id)}>
                                                学习
                                        </Button></Col>
                                    </Row>
                                </Item>
                            </li>
                        )
                    })}
                </ol>
            </Col>
            <Col span={12}>
                <ol>
                    {studyData.map((i) => {
                        return (
                            <li key={i.id}>
                                <Item data={i} >
                                    <Button onClick={() => delStudy(i.id)}>
                                        删除
                                        </Button>
                                </Item>
                            </li>
                        )
                    })}
                </ol>
            </Col>
        </Row>
    )
}
export default observer(WordShow)