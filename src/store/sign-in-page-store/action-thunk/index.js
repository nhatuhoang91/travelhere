
import {AuthStatus} from '../../../types'
import {signinWithEmailAndPasswordService} from '../../../services/signin-page-services'
import {changeAuthStatusAction} from '../../app-store/action'
import {changeUserDisplayNameAction, changeUserIdAction, changeIsVerifiedAction} from '../../user-store/action'
import {changeSigninErrorAction, changeIsWaitingAction} from '../action'

export const signinWithEmailAndPasswordThunk = (email, password, cb) => async dispatch => {
    try{
        const user = await signinWithEmailAndPasswordService(email, password)
        //change user store
        dispatch(changeAuthStatusAction(AuthStatus.SIGNED_IN))
        dispatch(changeIsVerifiedAction(user.emailVerified))
        dispatch(changeUserDisplayNameAction(user.displayName))
        dispatch(changeUserIdAction(user.uid))
        cb()
    }catch(e){
        switch (e.code){
            case 'auth/invalid-email':
                dispatch(changeSigninErrorAction('Email is invalid'))
                break
            case 'auth/user-disabled':
                dispatch(changeSigninErrorAction('User disabled'))
                break
            case 'auth/user-not-found':
                dispatch(changeSigninErrorAction('User not found'))
                break
            case 'auth/wrong-password':
                dispatch(changeSigninErrorAction('Wrong password'))
                break
            default:
                dispatch(changeSigninErrorAction(e))
        }
    }finally{
        //change signup page store anyway
        dispatch(changeIsWaitingAction(false))
    }
}