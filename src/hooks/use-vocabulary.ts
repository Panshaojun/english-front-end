import { useState, useEffect } from 'react';
import { KaoyanVocabularyData } from '@/api/modules/server/kaoyan-vocabulary';
import useStores from '@/store';

const useVocabulary: (id: number) => KaoyanVocabularyData | undefined = (id: number) => {
    const [data, setData] = useState<KaoyanVocabularyData | undefined>();
    const { rootStore: { thirdPartyStore } } = useStores();
    useEffect(() => {
        if (!data) {
            setData(thirdPartyStore.getVocalbulary(id));
        }
    }, [thirdPartyStore.fetching,id,data,thirdPartyStore])
    return data;
}

export default useVocabulary;