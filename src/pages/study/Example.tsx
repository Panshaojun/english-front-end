import { FC } from 'react';
import { Col } from 'antd';
import {KaoYan} from '@/api/modules/server/kaoyan';

const Example: FC<{ data: KaoYan }> = ({ data }) => {
    return (
        <>
            <Col span={1}></Col>
            <Col span={4}>{data.w}</Col>
            <Col span={19}>{data.e}</Col>
        </>
    )
}
export default Example