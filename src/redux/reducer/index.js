import { combineReducers } from "redux";

import User from './user';
import Offer from './offer';
import Job from './jobs';
import Work from './work';
import UserType from './userType';

export default combineReducers({
    User,
    Offer,
    Job,
    Work,
    UserType
})
