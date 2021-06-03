import { PageHeader } from 'antd';
import {useHistory} from 'react-router-dom';
const Review = () => {
    const history=useHistory();
    const back=()=>{
        history.goBack();
    }
    return (
        <PageHeader
            onBack={back}
            title="返回"
        />
    )
}

export default Review;