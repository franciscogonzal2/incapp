import React from 'react'
import { AiFillDelete } from "react-icons/ai";

function TableInfo(cardInfo) {
  return (
    <table className="table-auto border-2 w-auto">
      <thead>
        <tr className="bg-gray-300">
          <th>employee</th>
          <th>Application date</th>
          <th>Medical unit</th>
          <th>Doctor</th>
          <th>Days of coverage</th>
          <th>Start date</th>
          <th>End date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {cardInfo && cardInfo.cardInfo  && cardInfo.cardInfo.map((item, index) => (
          <tr className="h-8 border-b-2" key={index}>
            <td>{item.employee}</td>
            <td>{item.startDay}</td>
            <td>{item.medicalUnit}</td>
            <td>{item.doctor}</td>
            <td>{item.daysOff}</td>
            <td>{item.startDay}</td>
            <td>{item.endDay}</td>
            <td className='flex row items-center cursor-pointer text-red-700 font-bold fill-red-700 '> <AiFillDelete/></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableInfo