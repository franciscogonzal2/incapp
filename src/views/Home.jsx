import React, { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import TableInfo from "../components/TableInfo";
import UserActioBar from "../components/UserActioBar";
import firebaseApp from "../firebase/credentials";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

function Home({ user }) {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "incap");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incap, setIncap] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  const getIncap = () => {
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const docs = []
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id:doc.id});
      });
      setIncap(docs)
    });

    return unsubscribe;
  };
  useEffect(() => {
    const unsubscribe = getIncap();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col mt-96 ml-10 mr-10 mb-10">
      <UserActioBar userData={user} onOpenModal={() => openModal()} />
      {isModalOpen ?
        <Modal onClose={() => closeModal()} userData={user} /> : null
      }
      <Filter />
      <TableInfo cardInfo={incap}/>
    </div>
  );
}

export default Home;