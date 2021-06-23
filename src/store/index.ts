import { createContext, useContext } from 'react';
import Store from './module/root-store'
const storeContext = createContext({
    store:new Store
})
const useStores = () => useContext(storeContext);
export default useStores;