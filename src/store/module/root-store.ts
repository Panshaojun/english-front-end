import DataStore from "./data-store";
import ReviewStore from "./review-store";
import StudyStore from "./study-store";
import ThirdPartyStore from "./third-party-store";
class RootStore {
    dataStore: DataStore;
    reviewStore: ReviewStore;
    thirdPartyStore: ThirdPartyStore;
    studyStore: StudyStore;

    constructor() {
        this.dataStore = new DataStore(this);
        this.reviewStore = new ReviewStore(this);
        this.studyStore = new StudyStore(this);
        this.thirdPartyStore = new ThirdPartyStore(this);
    }
}

export default RootStore;