import React from 'react'
import '../styles/thriposhatable.css'

const Thriposhatable = () => {
  return (
    <div className='thriposhatable'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Thriposha Type</th>
                    <th>Estimated Date</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>For children</td>
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

        <button className='generate'>Generate Report</button>
    </div>
  )
}

export default Thriposhatable