
import {AuthStatus} from '../../../types'
import {signinWithEmailAndPasswordService} from '../../../services/signin-page-services'
import {changeAuthStatusAction} from '../../app-store/action'
import {changeUserDisplayName, changeUserId, changeIsVerified} from '../../user-store/action'
import {changeSigninError, changeIsWaiting} from '../action'

export const signinWithEmailAndPasswordThunk = (email, password, cb) => async dispatch => {
    try{
        const user = await signinWithEmailAndPasswordService(email, password)
        //change user store
        dispatch(changeAuthStatusAction(AuthStatus.SIGNED_IN))
        dispatch(changeIsVerified(user.emailVerified))
        dispatch(changeUserDisplayName(user.displayName))
        dispatch(changeUserId(user.uid))
        cb()
    }catch(e){
        switch (e.code){
            case 'auth/invalid-email':
                dispatch(changeSigninError('Email is invalid'))
                break
            case 'auth/user-disabled':
                dispatch(changeSigninError('User disabled'))
                break
            case 'auth/user-not-found':
                dispatch(changeSigninError('User not found'))
                break
            case 'auth/wrong-password':
                dispatch(changeSigninError('Wrong password'))
                break
            default:
                dispatch(changeSigninError(e.message))
        }
    }finally{
        //change signup page store anyway
        dispatch(changeIsWaiting(false))
    }
}