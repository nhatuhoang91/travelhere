import ActionTypes from '../../action-constants'

export const changeUserDisplayName = (userDisplayName) => {
    return {
        type: ActionTypes.CHANGE_USER_DISPLAY_NAME,
        userDisplayName
    }
}

export const changeUserImageUrl = (userImageUrl) => {
    return {
        type: ActionTypes.CHANGE_USER_IMAGE_URL,
        userImageUrl
    }
}

export const changeUserId = (userId) => {
    return {
        type: ActionTypes.CHANGE_USER_ID,
        userId
    }
}

export const changeIsVerified = (isVerified) => {
    return {
        type: ActionTypes.CHANGE_IS_VERIFIED,
        isVerified
    }
}