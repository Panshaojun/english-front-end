import {createContext,useContext} from 'react';
import bingStore from './modules/bingStore';
import kaoyanStore from './modules/kaoyanStore';
import reviewStore from './modules/reviewStore';
const storeContext= createContext({
    reviewStore:new reviewStore(),
    bingStore:new bingStore(),
    kaoyanStore:new kaoyanStore()
})
const useStores = () => useContext(storeContext);
export default useStores;