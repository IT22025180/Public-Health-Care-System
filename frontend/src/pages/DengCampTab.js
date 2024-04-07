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
            setcampdata(response.data.allCampaign);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }

    const campDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteCamp', { _id: id })
            .then(response => {
                console.log('Campaign data deleted successfully');
                setcampdata(prevData => prevData.filter(camp => camp._id !== id));
            })
            .catch(error => {
                console.error('Error deleting campdata:', error);
            });
    };

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
                        <button onClick={()=> campDelete(camp._id)}>Delete</button>
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