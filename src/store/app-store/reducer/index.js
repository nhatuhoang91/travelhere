import {combineReducers} from 'redux'
import ActionTypes from '../../action-constants'
import {AuthStatus} from '../../../types'

const authStatusReducer = (state = AuthStatus.SIGNED_OUT, action) => {
    switch (action.type){
        case ActionTypes.CHANGE_AUTH_STATUS:
            return   action.authStatus
        default :
            return state
    }
}

const appStoreReducer = combineReducers(
    {
        authStatus : authStatusReducer
    }
)
export default appStoreReducer