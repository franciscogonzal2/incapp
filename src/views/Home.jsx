import React, {useState} from "react";
import firebaseApp from "../firebase/credentials";
import { getAuth, signOut } from "firebase/auth";
import Modal from "./Modal";

const auth = getAuth(firebaseApp);

function Home({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col mt-96 ml-10 mr-10 mb-10">
      <div>
      <span>{user.email}</span>
      <button className="bg-red-800 text-white" onClick={openModal}>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
        + Add New
      </button>
      </div>
    <table className="table-auto border-2 w-auto">
    <thead>
      <tr className="bg-gray-300">
        <th>Song</th>
        <th>Artist</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b-4">
        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
        <td>Malcolm Lockyer</td>
        <td>1961</td>
      </tr>
      <tr>
        <td>Witchy Woman</td>
        <td>The Eagles</td>
        <td>1972</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr>
    </tbody>
  </table>
  </div>
  );
}

export default Home;