import { observer } from 'mobx-react';
import useStores from '@/store';
import Review from '@/components/review';
const ReviewToday = () => {
    const { rootStore:{reviewStore:{reviewToday}} } = useStores();
    return (
        <Review data={reviewToday} title={'今日复习'} />
    );
}

export default observer(ReviewToday);