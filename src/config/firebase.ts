// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdK9OTvT7dYB4ApcFKQb61_yg2JMGUt2c',
  authDomain: 'super-heroes-c3a1b.firebaseapp.com',
  projectId: 'super-heroes-c3a1b',
  storageBucket: 'super-heroes-c3a1b.appspot.com',
  messagingSenderId: '57454203432',
  appId: '1:57454203432:web:d792faea306031a45ddb1d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseStorage = getStorage(app);
