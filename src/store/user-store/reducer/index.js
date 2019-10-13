import {combineReducers} from 'redux'
import ActionTypes from '../../action-constants'

const userDisplayNameReducer = (state = null, action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_USER_DISPLAY_NAME:
            return action.userDisplayName
        default:
            return state
    }
}

const userImageUrlReducer = (state = null, action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_USER_IMAGE_URL:
            return action.userImageUrl
        default:
            return state
    }
}

const userIdReducer = (state = null, action) => {
    switch (action.type){
        case ActionTypes.CHANGE_USER_ID:
            return action.userId
        default:
            return state
    }
}

const isVerifiedReducer = (state = null, action) => {
    switch (action.type){
        case ActionTypes.CHANGE_IS_VERIFIED:
            return action.isVerified
        default:
            return state
    }
}

const userStoreReducer = combineReducers({
    userId : userIdReducer,
    userDisplayName : userDisplayNameReducer,
    userImageUrl : userImageUrlReducer,
    isVerified : isVerifiedReducer
})

export default userStoreReducer