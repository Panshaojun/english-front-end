import { post, handleResult } from '@/api/utils/common-api';
import { KaoYanBingData } from './kaoyan-bing';
import { KaoyanVocabularyData } from './kaoyan-vocabulary';

export const getBing = async (ids: number[]) => handleResult<KaoYanBingData[]>(await post("/db/getBing", { ids }));

export const getVocabulary = async (ids: number[]) => handleResult<KaoyanVocabularyData[]>(await post("/db/getVocabulary", { ids }));