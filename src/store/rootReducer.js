import {combineReducers} from 'redux'
import appStoreReducer from './app-store/reducer'
import signupPageStoreReducer from './sign-up-page-store/reducer'
import signinPageStoreReducer from './sign-in-page-store/reducer'
import userStoreReducer from './user-store/reducer'

const rootReducer = combineReducers({
    appStore : appStoreReducer,
    userStore : userStoreReducer,
    signupPageStore : signupPageStoreReducer,
    signinPageStore : signinPageStoreReducer
});
export default rootReducer;