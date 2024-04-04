import React, { useEffect, useState } from 'react'
import '../styles/LeaveTable.css'
import Axios from 'axios';

const LeaveTable = () => {

    const [leavedata,setleavedata]=useState([]);
    
    useEffect(()=>{
        getleavedata();
    },[]);

    const getleavedata = ()=> {
        Axios.get('http://localhost:4000/api/Leave')
    }
  return (
    <div className='LeaveTable'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Staff ID</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Leaves For</th>
                    <th>Leave Start</th>
                    <th>Leave End</th>
                    <th>Leave Type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Chaminda Liyanaarchchi</td>
                    <td>D-1003</td>
                    <td>chamindaliyanaarachchi@gmail.com</td>
                    <td>Doctor</td>
                    <td>Days</td>
                    <td>2024/04/05</td>
                    <td>2024/04/07</td>
                    <td>Sick</td>
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

export default LeaveTable
