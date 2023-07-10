import './index.css';
import React, {useState} from 'react';
import moment from 'moment';

import {useAuthState}  from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBNaLiGQdT3zbA8-IGjNq0XjmdfXTi6Huw",
  authDomain: "post-app-14ceb.firebaseapp.com",
  projectId: "post-app-14ceb",
  storageBucket: "post-app-14ceb.appspot.com",
  messagingSenderId: "490868220616",
  appId: "1:490868220616:web:b0be209e7c95a4b966fbfd"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app);
const db = getFirestore(app);

// console.log(auth, db)

function App() {

    const [user] = useAuthState(auth)
    return (
      <div className='container'>
        {
          user ? 'Hello' : <SignIn />
        }
      </div>
    );
  }
  
  const SignIn = () => {
    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    }

    return (
      <div className='signin'>
        <button
        onClick={signInWithGoogle}
        className = 'btn btn-primary btn-lg'
        >
          Sign in with Google
        </button>
        </div>
    )
  }

  const SignOut = () => {
    
  }

export default App;
