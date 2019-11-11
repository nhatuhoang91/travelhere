import ActionTypes from '../../action-constants'

export const changeUserDisplayNameAction = (userDisplayName) => {
    return {
        type: ActionTypes.CHANGE_USER_DISPLAY_NAME,
        userDisplayName
    }
}

export const changeUserImageUrlAction = (userImageUrl) => {
    return {
        type: ActionTypes.CHANGE_USER_IMAGE_URL,
        userImageUrl
    }
}

export const changeUserIdAction = (userId) => {
    return {
        type: ActionTypes.CHANGE_USER_ID,
        userId
    }
}

export const changeIsVerifiedAction = (isVerified) => {
    return {
        type: ActionTypes.CHANGE_IS_VERIFIED,
        isVerified
    }
}