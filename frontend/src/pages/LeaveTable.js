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
        .then(response=>{
            console.log('data from server',response.data);
            setleavedata(response.data.allLeave);
        })
        .catch(error=>{
            console.error("Axios error :",error);
        })
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
                
                {
                    leavedata && leavedata.length>0?(
                        leavedata.map((leave)=>(
                            <tr key={leave._id}>
                    <td>{leave.name}</td>
                    <td>{leave.staffid}</td>
                    <td>{leave.email}</td>
                    <td>{leave.position}</td>
                    <td>{leave.doleave}</td>
                    <td>{leave.leavestrt}</td>
                    <td>{leave.leaveend}</td>
                    <td>{leave.leaveType}</td>
                    <td className='actionButtons'>
                        <button  >Edit</button>
                    </td>
                    <td className='deleteButtons'>
                        <button >Delete</button>
                    </td>

                </tr>
                        ))
                    ):(
                        <tr>
                        <td>You have not leave data</td>
                        </tr>
                    )}
                    
                    
                
            </tbody>
        </table>
        </div>
  )
}

export default LeaveTable
