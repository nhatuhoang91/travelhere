/*import {combineReducers} from 'redux'
import ActionTypes from '../../action-constants'

const fetchPostsReducer = (state = [], action) => {
    switch(action.type){
        case ActionTypes.FETCH_POSTS:
            return action.posts
        default:
            return state
    }
}
const homePageStoreReducer = combineReducers(
    {
        posts : fetchPostsReducer
    }
)
export default homePageStoreReducer
*/