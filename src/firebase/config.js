import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services

const projectFirestore = firebase.firestore();

export { projectFirestore };
