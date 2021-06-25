import { createContext, useContext } from 'react';
import RootStore from './module/root-store';
const storeContext = createContext({
    rootStore:new RootStore()
})
const useStores = () => useContext(storeContext);
export default useStores;