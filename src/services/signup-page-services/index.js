import {auth, storage} from '../../firebase'
import {getUserProfilePictureRef} from '../../firebase/storage/refs.js'

export const signupWithEmailAndPasswordService = async (email, password) => {
    try{
        await auth().createUserWithEmailAndPassword(email, password)        
    }catch(e){
        throw e //throw error to caller function to update UI
    }
}  

export const uploadProfilePictureService = async (uid, profilePictureBlob) => {
    try{
        const profilePictureRef = storage().ref(getUserProfilePictureRef(uid))
        await profilePictureRef.put(profilePictureBlob)
        //we don't need to handle progressing upload so we pass null to the function
        const profilePictureUrl = await profilePictureRef.getDownloadURL()
        return profilePictureUrl
    }catch(e){
        throw e
    }
}

export const updateUserProfileService = async (username, profilePictureUrl) => {
    try{
        if(profilePictureUrl){
            await auth().currentUser.updateProfile({
                displayName: username,
                photoURL: profilePictureUrl
            })
        }else{
            await auth().currentUser.updateProfile({
                displayName: username
            })
        }
    }catch(e){
        throw e
    }
}