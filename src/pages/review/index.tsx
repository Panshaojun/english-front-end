import { useEffect } from 'react';
import { PageHeader, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import useStores from '@/store';
import Item from './components/item';
const Review = () => {
    const { rootStore: { reviewStore: { reviewData }, thirdPartyStore } } = useStores();
    const history = useHistory();
    const back = () => {
        history.goBack();
    }
    useEffect(() => {
        thirdPartyStore.fetch(reviewData.map(i => i.id));
    }, [reviewData, thirdPartyStore]);
    return (
        <>
            <PageHeader
                onBack={back}
                title="返回"
            />
            {
                reviewData.map((val, index) => (
                    <div key={val.id}>
                        <Item data={val}></Item>
                        {index % 10 === 9 && <Divider />}
                    </div>
                ))
            }
        </>
    )
}

export default observer(Review);