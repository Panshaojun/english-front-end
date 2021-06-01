import {useState,useEffect} from 'react';
import { Row, Col, Button } from 'antd';
import { observer } from 'mobx-react';
import useStores from '@/store';
const useUpload:()=>[boolean,React.Dispatch<any>]=()=>{
    const [loading,setLoading]=useState<boolean>(false);
    useEffect(()=>{
        if(loading){
            console.log("开始触发上传功能");
            setTimeout(()=>{
                setLoading(false);
            },2000)
        }
    },[loading])
    return [loading,setLoading];
}
const TopOpt = () => {
    const [loading,setLoading]=useUpload();
    const { studyData, studyLength, addShowLength, addStudyLength } = useStores().kaoyanStore;
    return (
        <Row className="study-top">
            <Col span={12}>
                <Button type="primary" onClick={() => addShowLength(10)}>添加10个</Button>
            </Col>
            <Col span={4}>
                现在共计学习单词{studyData.length}/{studyLength}个
            </Col>
            <Col span={4}>
                {studyData.length === studyLength && <Button type="primary" onClick={()=>setLoading(true)}   loading={loading}>学习完毕,点击上传</Button>}
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