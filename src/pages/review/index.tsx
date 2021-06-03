import { PageHeader, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStores from '@/store';
import ReviewRow from './review-row';
const Review = () => {
    const { kaoyanStore: { reviewData } } = useStores();
    const history = useHistory();
    const back = () => {
        history.goBack();
    }
    return (
        <>
            <PageHeader
                onBack={back}
                title="返回"
            />
            {
                reviewData.map((val, index) => (
                    <div key={val.id}>
                        <ReviewRow data={val}></ReviewRow>
                        {index % 10 === 9 && <Divider/>}
                    </div>
                ))
            }
        </>
    )
}

export default observer(Review);