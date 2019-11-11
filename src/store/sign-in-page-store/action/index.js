import ActionTypes from '../../action-constants'

export const changeSigninErrorAction = (signinError) => {
    return {
        type: ActionTypes.CHANGE_SIGNIN_ERROR,
        signinError
    }
}

export const changeIsWaitingAction = (isWaiting) => {
    return {
        type: ActionTypes.CHANGE_IS_WAITING,
        isWaiting
    }
}