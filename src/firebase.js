import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: 'AIzaSyDn0swCiZFn4p5hy-DTZlS-Rf2bPKT1Cfk',
    authDomain: 'node-3b506.firebaseapp.com',
    databaseURL: 'https://node-3b506-default-rtdb.firebaseio.com',
    projectId: 'node-3b506',
    storageBucket: 'node-3b506.appspot.com',
    messagingSenderId: '679406939501',
    appId: '1:679406939501:web:1ee456d36a2a8247cb3e64',
    measurementId: 'G-VRDEXMCJCL',
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app)

export {database, storage}

  