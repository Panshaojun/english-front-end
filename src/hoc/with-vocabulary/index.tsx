import { FC } from 'react';
import { KaoyanVocabularyData } from '@/api/modules/server/kaoyan-vocabulary';
import useStores from '@/store';
const withvocabulary = (WrappedComponent: FC<{ data: KaoyanVocabularyData|undefined }>, id: number) => () => {
    const { store: { thirdPartyData } } = useStores();
    if (thirdPartyData.fetching) {
        return (
            <span>加载中</span>
        );
    }
    const data: KaoyanVocabularyData | undefined = thirdPartyData.getVocalbulary(id);
    return (<WrappedComponent data={data} />)
}

export default withvocabulary;