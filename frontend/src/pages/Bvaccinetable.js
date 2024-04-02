import React from 'react'
import '../styles/bvaccinetable.css'

const Bvaccinetable = () => {
  return (
    <div className='Bvaccinetable'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine Type</th>
                    <th>Estimated Date</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>HepB</td>
                    <td>05/05/2024</td>
                    <td>100</td>
                    <td className='actionButtons'>
                        <button  >Edit</button>
                    </td>
                    <td className='deleteButtons'>
                        <button >Delete</button>
                    </td>

                </tr>
            </tbody>
        </table>
        </div>
  )
}

export default Bvaccinetable