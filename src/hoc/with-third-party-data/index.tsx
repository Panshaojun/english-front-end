import { FC } from 'react';
import { KaoYanBingData } from '@/api/modules/server/kaoyan-bing';
import { KaoyanVocabularyData } from '@/api/modules/server/kaoyan-vocabulary';
import useStores from '@/store';
export const Index=()=>{
    return (
        <span>??</span>
    )
}
// const { store: { thirdPartyData:{fetching,getBing,getVocalbulary} } } = useStores();

// function withThirdPartyData<T>(WrappedComponent: FC<{ data: T|undefined }>, id: number) {
//     return (getData: (id: number) => T | undefined) => () => {
//         if (fetching) {
//             return (
//                 <span>加载中</span>
//             );
//         }
//         const data: T | undefined = getData(id);
//         return <WrappedComponent data={data} />;
//     }
// }

// export const withBing=(WrappedComponent: FC<{ data: KaoYanBingData|undefined }>, id: number)=>{
//     return withThirdPartyData(WrappedComponent,id)(getBing)
// }

// export const withVocabulary=(WrappedComponent: FC<{ data: KaoyanVocabularyData|undefined }>, id: number)=>{
//     return withThirdPartyData(WrappedComponent,id)(getVocalbulary)
// }