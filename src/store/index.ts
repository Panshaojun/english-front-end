import {createContext,useContext} from 'react';
import bingStore from './modules/bingStore';
import kaoyanStore from './modules/kaoyanStore';
import reviewStore from './modules/reviewStore';
import vocalbularyStore from './modules/vocalbularyStore';
const storeContext= createContext({
    reviewStore:new reviewStore(),
    bingStore:new bingStore(),
    kaoyanStore:new kaoyanStore(),
    vocalbularyStore:new vocalbularyStore()
})
const useStores = () => useContext(storeContext);
export default useStores;