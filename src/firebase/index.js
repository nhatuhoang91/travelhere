import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAaE9eIWgYmkpLlWtzqTrBUTFDaFSQx-f0",
    authDomain: "travelhere-8b2af.firebaseapp.com",
    databaseURL: "https://travelhere-8b2af.firebaseio.com",
    projectId: "travelhere-8b2af",
    storageBucket: "gs://travelhere-8b2af.appspot.com/",
    messagingSenderId: "529407612041",
    appId: "1:529407612041:web:320d4bcea3bf7ec063e258",
    measurementId: "G-5M4PY5CHZD"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export const storage = firebase.storage
  export const auth = firebase.auth
  export const firestore = firebase.firestore