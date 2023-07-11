import "./index.css";
import React, { useState } from "react";
import moment from "moment";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNaLiGQdT3zbA8-IGjNq0XjmdfXTi6Huw",
  authDomain: "post-app-14ceb.firebaseapp.com",
  projectId: "post-app-14ceb",
  storageBucket: "post-app-14ceb.appspot.com",
  messagingSenderId: "490868220616",
  appId: "1:490868220616:web:b0be209e7c95a4b966fbfd",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// console.log(auth, db)

function App() {
  const [user] = useAuthState(auth);
  return <div className="container">{user ? <Posts /> : <SignIn />}</div>;
}

const SignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
  };

  return (
    <div className="signin">
      <button onClick={signInWithGoogle} className="btn btn-primary btn-lg">
        Sign in with Google
      </button>
    </div>
  );
};

const SignOut = () => {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()} className="btn btn-secondary">
        Sign Out
      </button>
    )
  );
};

const Posts = () => {
  const postRef = collection(db, "users");

  const q = query(postRef, orderBy("createdAt", "desc"));

  const [users] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const makePost = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(postRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    console.log(formValue);
  };

  return (
    <>
      <div className="container m-3">
        <SignOut />
      </div>

      <div className="container m-4">
        <form onSubmit={makePost}>
          <input
            type="textarea"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary btn-sm mt-3">
            Post
          </button>
        </form>
      </div>

      <div className="container m-4">
        <h4 className="text-center">Posts</h4>
      </div>
      <div className="container-m4">
        {users && users.map((user) => <Post key={user.id} post={user} />)}
      </div>
    </>
  );
};

const Post = ({ post }) => {
  const { text, uid, photoURL, createdAt } = post;

  const postTime = createdAt && createdAt.toDate();

  const postClass = uid === auth.currentUser.uid ? "info" : "warning";

  return (
    <div className={`alert alert-${postClass}`}>
      <img className="rounded" src={photoURL} alt={uid} />
      {text}
      <p className="text-muted">
        {moment(postTime).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
    </div>
  );
};

export default App;
