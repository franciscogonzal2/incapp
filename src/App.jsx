import React, { useState } from "react";
import Home from "./views/Home";
import Login from "./views/Login";
import firebaseApp from "./firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { Route, Routes } from 'react-router-dom';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const usersCollectionRef = collection(firestore, "usuarios");
    const docuRef = doc(usersCollectionRef, uid);
    const data = await getDoc(docuRef);
    const infoFinal = data.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData fianl", userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return (
    <Routes>
      <Route path="/" element = {user ? <Home user={user} /> : <Login />}/>
      <Route path="/home" element= {<Home /> }/>
  </Routes>
  )
}

export default App;