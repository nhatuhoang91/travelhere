import {combineReducers} from 'redux'
import ActionTypes from '../../action-constants'

const signinErrorReducer = (state = '', action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_SIGNIN_ERROR:
            return action.signinError
        default:
            return state
    }
}

const isWaitingReducer = (state = false, action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_IS_WAITING:
            return action.isWaiting
        default:
            return state
    }
}

const signinPageStoreReducer = combineReducers({
    signinError : signinErrorReducer,
    isWaiting : isWaitingReducer
})

export default signinPageStoreReducer
