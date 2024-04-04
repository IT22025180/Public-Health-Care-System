import React, { useEffect, useState } from 'react'
import '../styles/Dengcamptab.css'
import Axios from 'axios';

const DengCampTab = () => {
    const [campdata,setcampdata]=useState([]);

    useEffect(()=>{
        getcampdata();
    },[]);

    const getcampdata =()=>{
        Axios.get('http://localhost:4000/api/camp')
        .then(response => {
            console.log('data from server',response.data);
            setcampdata(response.data.allCampaign); //methna
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }
  return (
    <div className='Dcamptable'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Starting time</th>
                    <th>Conducted by</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
             {campdata && campdata.length > 0 ? (
                campdata.map((camp)=>(
                <tr key={camp._id}>
                    <td>{camp.venue}</td>
                    <td>{camp.date}</td>
                    <td>{camp.time}</td>
                    <td>{camp.drName}</td>
                    <td className='actionButtons'>
                        <button  >Edit</button>
                    </td>
                    <td className='deleteButtons'>
                        <button >Delete</button>
                    </td>
   
                </tr>))
            ):(
                <tr>
                    <td>You have not camp data</td>
                </tr>
             )}   
               
            </tbody>
        </table>
        </div>
  )
}

export default DengCampTab