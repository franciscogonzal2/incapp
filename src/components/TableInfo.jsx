import React from 'react'

function TableInfo() {
  return (
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
  )
}

export default TableInfo