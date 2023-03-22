import React from 'react'

function Filter() {
  return (
    <form>
        <div className="relative flex flex-col justify-between items-center mb-8 md:flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 md:my-auto mt-2 text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search" className="w-full py-3 pl-4 pr-12 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 text-right" />
          <input type="date" className="w-full  md:w-64 py-3 pl-4 pr-12 text-gray-500 border rounded-md outline-none ml-2 bg-gray-50 focus:bg-white focus:border-indigo-600 text-right" />
          <input type="date" className="w-full md:w-64 py-3  pl-4 pr-12 text-gray-500 border rounded-md outline-none ml-2 bg-gray-50 focus:bg-white focus:border-indigo-600 text-right" />
          <button className="w-full md:w-64 bg-gray-300 ml-4 p-3 rounded-lg text-gray-500 font-bold hover:bg-gray-800 px-4">Filter</button>
        </div>
      </form>
  )
}

export default Filter