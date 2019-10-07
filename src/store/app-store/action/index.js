import ActionTypes from '../../action-constants'

export const changeAuthStatusAction = (authStatus) => (
    {
        type : ActionTypes.CHANGE_AUTH_STATUS,
        authStatus
    }
)