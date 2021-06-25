
import { Row, Col, Button } from 'antd';
import { observer } from 'mobx-react';
import useStores from '@/store';

const TopOpt = () => {
    const { studyData, uploading, studyLength, addShowLength, addStudyLength, uploadReview } = useStores().rootStore.studyStore;
    return (
        <Row className="study-top">
            <Col span={12}>
                <Button type="primary" onClick={() => addShowLength(10)}>添加10个</Button>
            </Col>
            <Col span={4}>
                现在共计学习单词{studyData.length}/{studyLength}个
            </Col>
            <Col span={4}>
                {studyData.length === studyLength && <Button type="primary" onClick={uploadReview} loading={uploading}>学习完毕,点击上传</Button>}
            </Col>
            <Col span={2}>
                <Button type="primary" onClick={() => addStudyLength(10)}>添加10个</Button>
            </Col>
            <Col span={2}>
                <Button type="primary" onClick={() => addStudyLength(-10)}>减少10个</Button>
            </Col>
        </Row>
    )
}

export default observer(TopOpt);