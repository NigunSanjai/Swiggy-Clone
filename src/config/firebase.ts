import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAZgShiw6Vk9nQpvmDB3lzFrFBCiW1df20',
  authDomain: 'linked-in-76830.firebaseapp.com',
  projectId: 'linked-in-76830',
  storageBucket: 'linked-in-76830.appspot.com',
  messagingSenderId: '280038716622',
  appId: '1:280038716622:web:6702e59ed40bb7be89cc9f',
  measurementId: 'G-3BXD0PN06R',
};
// const firebaseConfig = {
//   apiKey: 'AIzaSyCkN70L5bpBLAFlpw3-SPRw-fU_OFnuqK0',
//   authDomain: 'verify-929bb.firebaseapp.com',
//   projectId: 'verify-929bb',
//   storageBucket: 'verify-929bb.appspot.com',
//   messagingSenderId: '162115363114',
//   appId: '1:162115363114:web:761b16378522b5b23d3e53',
//   measurementId: 'G-M603HMF1HK',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

export { app, authentication, db };
