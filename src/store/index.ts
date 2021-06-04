import { createContext, useContext } from 'react';
import bingStore from './modules/bing-store';
import kaoyanStore from './modules/kaoyan-store';
import reviewStore from './modules/review-store';
import vocalbularyStore from './modules/vocalbulary-store';
const storeContext = createContext({
    reviewStore: new reviewStore(),
    bingStore: new bingStore(),
    kaoyanStore: new kaoyanStore(),
    vocalbularyStore: new vocalbularyStore()
})
const useStores = () => useContext(storeContext);
export default useStores;