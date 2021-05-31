import {createContext,useContext} from 'react';
import kaoyanStore from './modules/kaoyanStore';
const storeContext= createContext({
    kaoyanStore:new kaoyanStore()
})
const useStores = () => useContext(storeContext);
export default useStores;