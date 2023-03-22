import React, { useState } from 'react';
import firebaseApp from "../firebase/credentials";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { GoX } from "react-icons/go";

const Modal = ({ onClose, userData }) => {
  const [formValues, setFormValues] = useState({
    idAplication: Date.now().toString(36) + Math.random().toString(36).substr(2),
    employee: '',
    medicalUnit: '',
    startDay: '',
    doctor: '',
    endDay: '',
    daysOff: '',
    diagnosis: '',
    employeeId: '',
    employeeEmail: '',
  });
  const [errors, setErrors] = useState({});
  const db = getFirestore(firebaseApp);
  const collectionRef = collection(db, "incap");

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { startDay, endDay, daysOff } = formValues;

    const errors = {};

    if (!startDay) {
      errors.startDay = 'Start day is required';
    }

    if (!endDay) {
      errors.endDay = 'End day is required';
    }

    if (daysOff <= 0) {
      errors.daysOff = 'Days off must be greater than 0';
    }

    if (new Date(startDay) > new Date(endDay)) {
      errors.endDay = 'End day must be after start day';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      addDoc(collectionRef, formValues)
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error('Error submitting application: ', error);
        });
    }
  };

  return (
    <div className={'modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-10 overflow-y-auto'}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-4/5 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl content-center text-black font-bold ">Sick leave application</p>
            <GoX className='cursor-pointer' onClick={() => onClose()} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-row space-x-3 w-full'>
              <div className="flex flex-col mb-3">
                <label htmlFor="employee" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  employee
                </label>
                <input
                  className="border border-gray-800 rounded-lg py-2 px-4 block w-full text-gray-600"
                  id="employee"
                  name="employee"
                  type="text"
                  placeholder="employee"
                  value={formValues.employee}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="daysOff" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Days Covarage
                </label>
                <input
                  className=" border border-gray-800 rounded-lg py-2 px-4 block w-full text-gray-600"
                  id="daysOff"
                  name="daysOff"
                  type="number"
                  placeholder="Days Covarage"
                  value={formValues.daysOff}
                  onChange={handleChange}
                />
                {errors.daysOff && <p className="text-red-500 text-xs">{errors.daysOff}</p>}
              </div>
            </div>
            <div className='flex flex-row space-x-3 w-full'>
              <div className="flex flex-col mb-3">
                <label htmlFor="doctor" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Doctor
                </label>
                <input
                  className=" rounded-lg border border-gray-800 py-2 px-4 block w-full text-gray-600"
                  id="doctor"
                  name="doctor"
                  type="text"
                  placeholder="Doctor"
                  value={formValues.doctor}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="medicalUnit" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Medical Unit
                </label>
                <input
                  className=" border border-gray-800 rounded-lg py-2 px-4 block w-full text-gray-600"
                  id="medicalUnit"
                  name="medicalUnit"
                  type="text"
                  placeholder="Medical Unit"
                  value={formValues.medicalUnit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='flex flex-row space-x-3 w-full' >
              <div className="flex flex-col mb-3">
                <label htmlFor="startDay" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Start Day
                </label>
                <input
                  className="border border-gray-800 rounded-lg py-2 px-4 block w-48 text-gray-600 h-full"
                  id="startDay"
                  name="startDay"
                  type="date"
                  placeholder="Start Day"
                  value={formValues.startDay}
                  onChange={handleChange}
                />
              </div>
              {errors.startDay && <p className="text-red-500 text-xs">{errors.startDay} </p>}
              <div className="flex flex-col mb-3">
                <label htmlFor="endDay" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  End Day
                </label>
                <input
                  className=" border border-gray-800 rounded-lg py-2 px-4 block w-48 text-gray-600"
                  id="endDay"
                  name="endDay"
                  type="date"
                  placeholder="End Day"
                  value={formValues.endDay}
                  onChange={handleChange}
                />
                {errors.endDay && <p className="text-red-500 text-xs">{errors.endDay}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="diagnosis" for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">diagnosis</label>
              <textarea
                value={formValues.diagnosis}
                onChange={handleChange}
                id="diagnosis" rows="4"
                name='diagnosis'
                type="text"
                className=" border border-gray-800 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write diagnosis here...." />

            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="modal-close px-4 bg-blue-700 p-3 rounded-lg text-white hover:bg-indigo-400"
              >
                Submit application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
export default Modal
