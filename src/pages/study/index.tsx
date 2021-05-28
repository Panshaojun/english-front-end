import { Component} from 'react';
import { Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import Example from './Example';
import KaoYanStore from '@/store/types/kaoyan';


@inject('kaoyan')
@observer
class Study extends Component<{kaoyan: KaoYanStore}>{

    render(){
        console.log('render');
        let {index,addIndex} =this.props.kaoyan;
        return (
            <Row>
                <p onClick={()=>this.props.kaoyan.addIndex()}>{index}</p>
                <Col span={12}>2</Col>
            </Row>
        )
    }
}

export default Study;