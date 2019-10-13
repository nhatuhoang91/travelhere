import {combineReducers} from 'redux'
import ActionTypes from '../../action-constants'

const emailErrorReducer = (state = '', action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_EMAIL_ERROR:
            return action.emailError
        default:
            return state
    }
}

const passwordErrorReducer = (state = '', action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_PASSWORD_ERROR:
            return action.passwordError
        default:
            return state
    }
}

const retypePasswordErrorReducer = (state = '', action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_RETYPE_PASSWORD_ERROR:
            return action.retypePasswordError
        default:
            return state
    }
}

const usernameErrorReducer = (state = '', action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_USERNAME_ERROR:
            return action.usernameError
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

const signupErrorReducer = (state = '', action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_SIGN_UP_ERROR:
            return action.signupError
        default:
            return state
    }
}

const signupPageStoreReducer = combineReducers({
    emailError : emailErrorReducer,
    passwordError : passwordErrorReducer,
    retypePasswordError : retypePasswordErrorReducer,
    usernameError : usernameErrorReducer,
    isWaiting : isWaitingReducer,
    signupError : signupErrorReducer
})

export default signupPageStoreReducer
