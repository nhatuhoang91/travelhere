import ActionTypes from '../../action-constants'

export const changeSigninError = (signinError) => {
    return {
        type: ActionTypes.CHANGE_SIGNIN_ERROR,
        signinError
    }
}

export const changeIsWaiting = (isWaiting) => {
    return {
        type: ActionTypes.CHANGE_IS_WAITING,
        isWaiting
    }
}