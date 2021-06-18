import { createContext, useContext } from 'react';
import dataStore from './modules/data-store';
// import bingStore from './modules/bing-store';
// import kaoyanStore from './modules/kaoyan-store';
import reviewStore from './modules/review-store';
// import vocalbularyStore from './modules/vocalbulary-store';
const storeContext = createContext({
    reviewStore: new reviewStore(),
    dataStore:new dataStore()
})
const useStores = () => useContext(storeContext);
export default useStores;