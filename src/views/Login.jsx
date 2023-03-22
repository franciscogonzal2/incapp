import React from "react";
import { useForm } from 'react-hook-form';
import firebaseApp from "../firebase/credentials";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import imagen from '../img/logo.png';
import { useState } from 'react';

const auth = getAuth(firebaseApp);

function Login() {
    const [singInError, setSingInError] = useState(false);
    const { register, handleSubmit, formState: {errors } } = useForm();

    async function onSubmit(data) {
        try {
          const email = data.email;
          const password = data.password;
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          setSingInError(true)
        }
      }
      
    return (
        <div className="flex justify-center items-center h-screen w-screen flex-col border-4">
            <div className="flex flex-col items-center h-96 w-96 border-2">
                <img src={imagen} alt="no file" />
                <form className="w-full max-w-sm text-center">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-2/3 ">
                            <input className="bg-gray-200 appearance-none border-2 ml-11 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" {...register("email", { required: true })} id="inline-full-name" type="text" placeholder="Email" />
                            {errors.email && <p className="text-red-500">required email</p>}
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-2/3">
                            <input className=" bg-gray-200 appearance-none border-2  ml-11 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-700" id="inline-password" {...register("password", { required: true })} type="password" placeholder="password" />
                            {errors.email && <p className="text-red-500">required passwor</p>}
                            {singInError && <span className="text-red-500 items-center">Please make sure your email and password are correct and try again.</span>}
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-2/3 mx-auto">
                            <button className="shadow bg-blue-700 hover:bg-red-800 focus:shadow-outline focus:outline-none  text-white font-bold py-2 px-4 rounded w-full max-w-xs"  onClick={handleSubmit(onSubmit)} type="button">
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;