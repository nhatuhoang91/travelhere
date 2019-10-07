import {combineReducers} from 'redux'
import appStoreReducer from './app-store/reducer'

const reducer = combineReducers({
    appStore : appStoreReducer,
});
export default reducer;