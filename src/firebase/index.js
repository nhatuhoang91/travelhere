import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export const storage = firebase.storage
  export const auth = firebase.auth
  export const firestore = firebase.firestore