import {AuthStatus} from '../../../types'
import {signupWithEmailAndPasswordService} from '../../../services/signup-page-services'
import {changeAuthStatusAction} from '../../app-store/action'
import {changeUserDisplayName, changeUserId, changeIsVerified} from '../../user-store/action'
import {changeIsWaiting, changeSignupError} from '../../sign-up-page-store/action'

export const signupWithEmailAndPassword = (email, password, username) => async dispatch => {
    try{
        const user = await signupWithEmailAndPasswordService(email, password)
        //change user store
        dispatch(changeAuthStatusAction(AuthStatus.SIGNED_IN))
        dispatch(changeIsVerified(false))
        dispatch(changeUserDisplayName(username))
        dispatch(changeUserId(user.uid))

        //change signup page store
        dispatch(changeIsWaiting(false))
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
    }
    
}