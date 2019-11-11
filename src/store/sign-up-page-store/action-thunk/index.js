import {AuthStatus, SignupStep} from '../../../types'
import {signupWithEmailAndPasswordService, 
    uploadProfilePictureService,
    updateUserProfileService} from '../../../services/signup-page-services'
import {changeAuthStatusAction} from '../../app-store/action'
import {changeUserDisplayNameAction,
    changeUserIdAction,
    changeIsVerifiedAction,
    changeUserImageUrlAction} from '../../user-store/action'
import {changeIsWaitingAction, 
    changeSignupErrorAction, 
    changeSignupStepAction, 
    changeWaitingTimeAction} from '../action'
import {auth} from '../../../firebase'

export const signupWithEmailAndPasswordThunk = (signupData) => async dispatch => {
    try{
        //signup, upload profile picture, then update user profile
        await signupWithEmailAndPasswordService(signupData.email, signupData.password)  
        //send email verification and wait for user action
        await auth().currentUser.sendEmailVerification()
        dispatch(changeSignupStepAction(SignupStep.STEP_2))
        var timeLimit = 20
        const id = setInterval((resole, reject) => {
            if(!auth().currentUser.emailVerified){
                if(timeLimit>=0){
                    dispatch(changeWaitingTimeAction(timeLimit))
                    timeLimit = timeLimit - 1
                    auth().currentUser.reload()
                }else{
                    clearInterval(id)
                    auth().currentUser.delete()
                    dispatch(changeUserIdAction(''))
                    dispatch(changeSignupStepAction(SignupStep.STEP_1))
                }
            }else{
                clearInterval(id)
                //change use store
                dispatch(changeAuthStatusAction(AuthStatus.SIGNED_IN))
                dispatch(changeIsVerifiedAction(true))
                dispatch(changeSignupStepAction(SignupStep.STEP_3))
            }
        }, 1000)
    }catch(e){
        switch (e.code){
            case 'auth/email-already-in-use':
                dispatch(changeSignupErrorAction('Email already in use'))
                break
            case 'auth/invalid-email':
                dispatch(changeSignupErrorAction('Invalid email'))
                break
            case 'auth/operation-not-allowed':
                dispatch(changeSignupErrorAction('Email/Password authentication is not enabled'))
                break
            case 'auth/weak-password':
                dispatch(changeSignupErrorAction('Password is too weak'))
                break
            case 'auth/missing-continue-uri':
                dispatch(changeSignupErrorAction('Missing continue uri in email verification'))
                break
            case 'auth/invalid-continue-uri':
                dispatch(changeSignupErrorAction('Invalid continue uri in email verification'))
                break
            case 'auth/unauthorized-continue-uri':
                dispatch(changeSignupErrorAction('Unauthorized continue uri'))
                break
            case 'auth/requires-recent-login':
                    dispatch(changeSignupErrorAction('Require recent login to delete user'))
                break
            default:
                console.log(e)
                //dispatch(changeSignupErrorAction(e))
        }
    }finally{
        //change signup page store anyway
        dispatch(changeIsWaitingAction(false))
    }  
}

export const updateUsernameAndProfilePictureThunk = (username, profilePictureBlob, cb) => async dispatch => {
    try{
        if(profilePictureBlob){
            console.log("profile picture blob is not null")
            const profilePictureUrl = await uploadProfilePictureService(auth().currentUser.uid, 
                profilePictureBlob)
            console.log("profilePictureUrl : ", profilePictureUrl)
            await updateUserProfileService(username, profilePictureUrl)
            dispatch(changeUserImageUrlAction(profilePictureUrl))
        }else{
            await updateUserProfileService(username, null)
        }
        dispatch(changeUserDisplayNameAction(username))
        dispatch(changeUserIdAction(auth().currentUser.uid))
        cb()
    }catch(e){
        dispatch(changeSignupErrorAction(e.message))
    }
}
