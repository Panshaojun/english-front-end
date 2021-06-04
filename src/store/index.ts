import { createContext, useContext } from 'react';
import bingStore from './modules/bing-store';
import kaoyanStore from './modules/kaoyan-store';
import reviewStore from './modules/reviewStore';
import vocalbularyStore from './modules/vocalbularyStore';
const storeContext = createContext({
    reviewStore: new reviewStore(),
    bingStore: new bingStore(),
    kaoyanStore: new kaoyanStore(),
    vocalbularyStore: new vocalbularyStore()
})
const useStores = () => useContext(storeContext);
export default useStores;