import {auth} from '../../firebase'

export const signinWithEmailAndPasswordService = async (email, password) => {
    var user = null
    try{
        const userCredential = await auth().signInWithEmailAndPassword(email, password)
        user = userCredential.user
    }catch(e){
        throw e //throw error to caller function to update UI
    }
    return user
}  