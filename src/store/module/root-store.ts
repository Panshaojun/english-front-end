import DataStore from "./data-store";
import ReviewStore from './review-store';
import ThirdPartyData from "./third-party-data";
class RootStore {
    dataStore: DataStore;
    reviewStore: ReviewStore;
    thirdPartyData: ThirdPartyData
    constructor() {
        this.dataStore = new DataStore(this);
        this.reviewStore = new ReviewStore(this);
        this.thirdPartyData = new ThirdPartyData(this);
    }
}

export default RootStore;