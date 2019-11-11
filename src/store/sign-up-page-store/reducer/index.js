import {combineReducers} from 'redux'
import {SignupStep} from '../../../types'
import ActionTypes from '../../action-constants'

const signupStepReducer = (state = SignupStep.STEP_1, action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_SIGNUP_STEP:
            return action.signupStep
        default:
            return state
    }
}

const waitingTimeReducer = (state = 0, action) =>{
    switch (action.type){
        case ActionTypes.CHANGE_WAITING_TIME:
            return action.time
        default:
            return state
    }
}

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
    signupStep : signupStepReducer,
    emailError : emailErrorReducer,
    passwordError : passwordErrorReducer,
    retypePasswordError : retypePasswordErrorReducer,
    usernameError : usernameErrorReducer,
    isWaiting : isWaitingReducer,
    signupError : signupErrorReducer,
    waitingTime : waitingTimeReducer
})

export default signupPageStoreReducer
