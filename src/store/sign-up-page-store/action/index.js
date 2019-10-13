import ActionTypes from '../../action-constants'

export const changeEmailError = (emailError) => {
    return {
        type: ActionTypes.CHANGE_EMAIL_ERROR,
        emailError
    }
}

export const changePasswordError = (passwordError) => {
    return {
        type: ActionTypes.CHANGE_PASSWORD_ERROR,
        passwordError
    }
}

export const changeRetypePasswordError = (retypePasswordError) => {
    return {
        type: ActionTypes.CHANGE_RETYPE_PASSWORD_ERROR,
        retypePasswordError
    }
}

export const changeUsernameError = (usernameError) => {
    return {
        type: ActionTypes.CHANGE_USERNAME_ERROR,
        usernameError
    }
}

export const changeIsWaiting = (isWaiting) => {
    return {
        type: ActionTypes.CHANGE_IS_WAITING,
        isWaiting
    }
}

export const changeSignupError = (signupError) => {
    return {
        type: ActionTypes.CHANGE_SIGN_UP_ERROR,
        signupError
    }
}