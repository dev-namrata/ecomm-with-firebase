import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBp_ycrftIFs7nNrKZXPWCTSDzYWm2hlH0',
  authDomain: 'firstecommfire.firebaseapp.com',
  projectId: 'firstecommfire',
  storageBucket: 'firstecommfire.appspot.com',
  messagingSenderId: '592199507185',
  appId: '1:592199507185:web:e6f9a80c5c077787175d50',
  measurementId: 'G-0D6GKCKW8N',
};

const app = initializeApp(firebaseConfig);
const database = getAuth(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, database };
