import * as firebase from 'firebase';

 var firebaseConfig = {
    apiKey: "AIzaSyBk0vnU860MU0fMnGOvm7KyW18lu63YrO0",
    authDomain: "blood-test-tvm.firebaseapp.com",
    databaseURL: "https://blood-test-tvm.firebaseio.com",
    projectId: "blood-test-tvm",
    storageBucket: "blood-test-tvm.appspot.com",
    messagingSenderId: "189905355209"
  };
  export const firebaseApp = firebase.initializeApp(firebaseConfig);