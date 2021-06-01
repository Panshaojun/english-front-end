import { FC } from 'react';
import { KaoYan } from '@/api/modules/server/kaoyan';
import { Row, Col, Button } from 'antd';
import { observer } from 'mobx-react';
import useStores from '@/store';
const WordShow = () => {
    const { showData, studyData, addStudy, delStudy } = useStores().kaoyanStore;
    return (
        <Row>
            <Col span={12}>
                <ol>
                    {showData.map((i) => {
                        return (
                            <li key={i.id}>
                                <Word data={i} >
                                    <Button onClick={() => addStudy(i.id)}>
                                        学习
                                        </Button>
                                </Word>
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
                                <Word data={i} >
                                    <Button onClick={() => delStudy(i.id)}>
                                        删除
                                        </Button>
                                </Word>
                            </li>
                        )
                    })}
                </ol>
            </Col>
        </Row>
    )
}
export default observer(WordShow)

const Word: FC<{
    data: KaoYan,
}> = ({ data, children }) => {
    return (
        <Row>
            <Col span={4}>{data.w}</Col>
            <Col span={17}>{data.e}</Col>
            <Col span={3}>
                {children}
            </Col>
        </Row>
    )
}