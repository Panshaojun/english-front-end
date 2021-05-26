import {useState,useEffect} from 'react';
import { Row, Col,Divider } from 'antd';
import {KaoYan,KaoyanModel} from '@/api/modules/kaoyan';
import Example from './Example';
const Study=()=>{
    const [data,setData]=useState<KaoYan[]>([]);
    useEffect(()=>{
        const req=async ()=>{
            const res=await KaoyanModel.findWhere<KaoYan[]>({
                limit:50
            });
            if(res){
                setData(res)
            }
        }
        req();
    },[])
    return (
        <Row>
            <Col span={12}>
                <Row gutter={[0,{ xs: 8, sm: 16, md: 18, lg: 22 }]}>
                {data.map((i,key)=>(
                    <Example data={i} key={key}/>
                ))}
                </Row>
            </Col>
            <Col span={12}>2</Col>
        </Row>
    )
}
export default Study;