import ActionTypes from '../../action-constants'

export const changeSignupStepAction = (signupStep) => {
    return {
        type: ActionTypes.CHANGE_SIGNUP_STEP,
        signupStep
    }
}

export const changeWaitingTimeAction = (time) => {
    return {
        type: ActionTypes.CHANGE_WAITING_TIME,  
        time
    }
}

export const changeEmailErrorAction = (emailError) => {
    return {
        type: ActionTypes.CHANGE_EMAIL_ERROR,
        emailError
    }
}

export const changePasswordErrorAction = (passwordError) => {
    return {
        type: ActionTypes.CHANGE_PASSWORD_ERROR,
        passwordError
    }
}

export const changeRetypePasswordErrorAction = (retypePasswordError) => {
    return {
        type: ActionTypes.CHANGE_RETYPE_PASSWORD_ERROR,
        retypePasswordError
    }
}

export const changeUsernameErrorAction = (usernameError) => {
    return {
        type: ActionTypes.CHANGE_USERNAME_ERROR,
        usernameError
    }
}

export const changeIsWaitingAction = (isWaiting) => {
    return {
        type: ActionTypes.CHANGE_IS_WAITING,
        isWaiting
    }
}

export const changeSignupErrorAction = (signupError) => {
    return {
        type: ActionTypes.CHANGE_SIGN_UP_ERROR,
        signupError
    }
}