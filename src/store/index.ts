import { createContext, useContext } from 'react';
import DataStore from './module/data-store';
import ReviewStore from './module/review-store';
import ThirdPartyStore from './module/third-party-store';

const storeContext = createContext({
    DataStore:new DataStore(),
    ReviewStore:new ReviewStore(),
    ThirdPartyStore:new ThirdPartyStore()
})
const useStores = () => useContext(storeContext);
export default useStores;