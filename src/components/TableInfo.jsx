import React from 'react'

function TableInfo(cardInfo) {
  return (
    <table className="table-auto border-2 w-auto">
      <thead>
        <tr className="bg-gray-300">
          <th>Medical diagnostic</th>
          <th>Application date</th>
          <th>Medical unit</th>
          <th>Medical unit</th>
          <th>Doctor</th>
          <th>Days of coverage</th>
          <th>Start date</th>
          <th>End date</th>
        </tr>
      </thead>
      <tbody>
      {cardInfo && cardInfo.cardInfo  && cardInfo.cardInfo.map((item, index) => (
          <tr className="h-8 border-b-2" key={index}>
            <td>{item.employee}</td>
            <td>{item.employee}</td>
            <td>{item.employee}</td>
            <td>{item.employee}</td>
            <td>{item.employee}</td>
            <td>{item.employee}</td>
            <td>{item.employee}</td>
            <td>{item.employee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableInfo