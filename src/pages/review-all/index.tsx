import { observer } from 'mobx-react';
import useStores from '@/store';
import Review from '@/components/review';
const ReviewToday = () => {
    const { rootStore: { reviewStore: { data } } } = useStores();
    return (
        <Review data={data} title={'全部复习'} />
    );
}

export default observer(ReviewToday);