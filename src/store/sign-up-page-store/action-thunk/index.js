import {AuthStatus} from '../../../types'
import {signupWithEmailAndPasswordService} from '../../../services/signup-page-services'
import {changeAuthStatusAction} from '../../app-store/action'
import {changeUserDisplayName, changeUserId, changeIsVerified} from '../../user-store/action'
import {changeIsWaiting, changeSignupError} from '../action'

export const signupWithEmailAndPasswordThunk = (email, password, username, cb) => async dispatch => {
    try{
        const user = await signupWithEmailAndPasswordService(email, password)
        //change user store
        dispatch(changeAuthStatusAction(AuthStatus.SIGNED_IN))
        dispatch(changeIsVerified(false))
        dispatch(changeUserDisplayName(username))
        dispatch(changeUserId(user.uid))
        cb()
    }catch(e){
        switch (e.code){
            case 'auth/email-already-in-use':
                dispatch(changeSignupError('Email already in use'))
                break
            case 'auth/invalid-email':
                dispatch(changeSignupError('Invalid email'))
                break
            case 'auth/operation-not-allowed':
                dispatch(changeSignupError('Email/Password authentication is not enabled'))
                break
            case 'auth/weak-password':
                dispatch(changeSignupError('Password is too weak'))
                break
            default:
                dispatch(changeSignupError(e.message))
        }
    }finally{
        //change signup page store anyway
        dispatch(changeIsWaiting(false))
    }
    
}