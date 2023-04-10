import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCG82PAtOX3LBLiB5-zT7_fbU438jjZ7qY",
  authDomain: "patreg-99b98.firebaseapp.com",
  projectId: "patreg-99b98",
  storageBucket: "patreg-99b98.appspot.com",
  messagingSenderId: "92524511414",
  appId: "1:92524511414:web:c168880b8af3e8a50e2617"
  // apiKey: "AIzaSyBexKonqQpLo6eSbCWy0mWxxstSYTB62CA",
  // authDomain: "patientregistration-880db.firebaseapp.com",
  // projectId: "patientregistration-880db",
  // storageBucket: "patientregistration-880db.appspot.com",
  // messagingSenderId: "835409936719",
  // appId: "1:835409936719:web:1b7b6b1188f6ca6952053a"
};


 if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
export default firebase.firestore()