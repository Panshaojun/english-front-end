import { useState, useEffect } from 'react';
import { KaoYanBingData } from '@/api/modules/server/kaoyan-bing';
import useStores from '@/store';

const useBing: (id: number) => KaoYanBingData | undefined = (id: number) => {
    const [data, setData] = useState<KaoYanBingData | undefined>();
    const { rootStore: { thirdPartyStore } } = useStores();
    useEffect(() => {
        if (!data) {
            setData(thirdPartyStore.getBing(id));
        }
    }, [thirdPartyStore.fetching])
    return data;
}

export default useBing;