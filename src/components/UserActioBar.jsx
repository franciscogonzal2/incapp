import React from 'react'
import firebaseApp from "../firebase/credentials";
import { BiLogOut } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";


function UserActioBar({userData, onOpenModal }) {
    const auth = getAuth(firebaseApp);

  return (
    <div className="flex row justify-between items-center font-bold">
    <div className="flex flex-row items-center">
      <div className="rounded-full overflow-hidden w-8 h-8 mr-2">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile-piccture" />
      </div>
      <div className="flex flex-col">
        <span>{userData.name}</span>
        <div onClick={() => signOut(auth)} className="flex row items-center cursor-pointer text-red-700 font-bold fill-red-700 w-24">
          <BiLogOut/>
          <p className="m-2">Log Out</p>
        </div>
      </div>
    </div>
    <button className="bg-blue-700 p-3 px-4 rounded-lg text-white m-5 hover:bg-blue-900" onClick={() => onOpenModal()}>New Application</button>
  </div>
  )
}

export default UserActioBar