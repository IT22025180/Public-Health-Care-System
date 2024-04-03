import React from 'react'
import '../styles/babytable.css'

const Babytable = () => {
  return (
    <div className='babytable'>
        
        <form >
        <button type="submit" class="search-button">Search</button>
    </form>
 
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Baby Name</th>
                    <th>Age(Year)</th>
                    <th>Weight(Kg)</th>
                    <th>Contact Number</th>
                    <th>Special Notes</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>fernando v.j</td>
                    <td>2 </td>
                    <td>6 </td>
                    <td>0771234567</td>
                    <td>Low weight</td>
                    <td className='actionButtons'>
                        <button>Edit</button>
                    </td>
                    <td className='deleteButtons'>
                        <button>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Babytable