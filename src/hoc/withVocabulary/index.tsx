import { FC, useState } from 'react';
import { KaoyanVocabularyData } from '@/api/modules/server/kaoyan-vocabulary';
import { observer } from 'mobx-react';
import useStores from '@/store';

const withVocabulary = (Component: FC<{ data: KaoyanVocabularyData | undefined }>) => observer(({ id, ...otherProps }: { id: number, [key: string]: any }) => {
    const [data, setData] = useState<KaoyanVocabularyData | undefined>();
    if (!data) {
        console.log("??")
        const { ThirdPartyStore } = useStores();
        if (!ThirdPartyStore.fetching) {
            const ans = ThirdPartyStore.getVocalbulary(id);
            if (ans) {
                setData(ans)
            }
        }
    }
    return (<Component {...otherProps} data={data} />)
})
export default withVocabulary