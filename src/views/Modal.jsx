import React, { useState } from 'react';
import firebaseApp from "../firebase/credentials";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";

const Modal = ({ isOpen, onClose, User }) => {
  const [formValues, setFormValues] = useState({
    idAplication:Date.now().toString(36) + Math.random().toString(36).substr(2),
    employee: '',
    input2: '',
    input3: '',
    medicalUnit: '',
    startDay: '',
    doctor: '',
    endDay: '',
    daysOff: '',
    diagnosis: '',
    employeeId: '',
    employeeEmail:'',
  });

  const [errors, setErrors] = useState({});

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
      const db = firebaseApp.firestore();
      db.collection('applications').add(formValues)
        .then(() => {
          console.log('Application submitted successfully');
          onClose();
        })
        .catch((error) => {
          console.error('Error submitting application: ', error);
        });
    }
  };

  const modalClass = isOpen ? 'block' : 'hidden';

  return (
    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${modalClass}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-4/5 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Modal Header</p>
            <button className="modal-close cursor-pointer z-50" onClick={onClose}>
              <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M1.5 16.5l15-15m0 15L1.5 1.5" />
              </svg>
            </button>
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
                  placeholder="Input 1"
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
                  placeholder="Days Off"
                  value={formValues.daysOff}
                  onChange={handleChange}
                />
                {errors.daysOff && <p className="text-red-500 text-xs">{errors.daysOff}</p>}
              </div>
            </div>
            <div className='flex flex-row space-x-3 w-full'>
              <div className="flex flex-col mb-3">
                <label htmlFor="input3" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Input 3
                </label>
                <input
                  className=" rounded-lg py-2 px-4 block w-full"
                  id="input3"
                  name="input3"
                  type="text"
                  placeholder="Input 3"
                  value={formValues.input3}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="medicalUnit" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Medical Unit
                </label>
                <input
                  className=" rounded-lg py-2 px-4 block w-full"
                  id="medicalUnit"
                  name="medicalUnit"
                  type="text"
                  placeholder="Medical Unit"
                  value={formValues.medicalUnit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col mb-3">
              <label htmlFor="startDay" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Start Day
              </label>
              <input
                className=" rounded-lg py-2 px-4 block w-full"
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
              <label htmlFor="doctor" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Doctor
              </label>
              <input
                className=" rounded-lg py-2 px-4 block w-full"
                id="doctor"
                name="doctor"
                type="text"
                placeholder="Doctor"
                value={formValues.doctor}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mb-3">
              <label htmlFor="endDay" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                End Day
              </label>
              <input
                className=" rounded-lg py-2 px-4 block w-full"
                id="endDay"
                name="endDay"
                type="date"
                placeholder="End Day"
                value={formValues.endDay}
                onChange={handleChange}
              />
              {errors.endDay && <p className="text-red-500 text-xs">{errors.endDay}</p>}
            </div>
            <div>
              <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
              <textarea
               value={formValues.diagnosis}
                onChange={handleChange}
                id="message" rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here...">
              </textarea>

            </div>
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="modal-close px-4 bg-blue-700 p-3 rounded-lg text-white hover:bg-indigo-400"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
export default Modal
