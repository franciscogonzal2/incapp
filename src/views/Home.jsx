import React, { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import TableInfo from "../components/TableInfo";
import UserActioBar from "../components/UserActioBar";
import firebaseApp from "../firebase/credentials";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Home({ user }) {
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "incap");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  const getIncap = async () => {
    try {
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getIncap();
  }, []);

  return (
    <div className="flex flex-col mt-96 ml-10 mr-10 mb-10">
      <UserActioBar userData={user} onOpenModal={() => openModal()} />
      {isModalOpen ?
        <Modal onClose={() => closeModal()} userData={user} /> : null
      }
      <Filter />
      <TableInfo />
    </div>
  );
}

export default Home;