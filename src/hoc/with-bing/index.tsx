import { FC } from 'react';
import { KaoYanBingData } from '@/api/modules/server/kaoyan-bing';
import useStores from '@/store';
const withBing = (WrappedComponent: FC<{ bing: KaoYanBingData }>, id: number) => () => {
    const { store: { thirdPartyData } } = useStores();
    if (thirdPartyData.fetching) {
        return (
            <span>加载中</span>
        );
    }
    const bing: KaoYanBingData | undefined = thirdPartyData.getBing(id);
    return bing ? (<WrappedComponent bing={bing} />) : (<span>数据加载失败</span>);

}
export default withBing;