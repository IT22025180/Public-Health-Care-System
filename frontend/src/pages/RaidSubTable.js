import React, { useEffect, useState } from 'react'
import '../styles/RaidSubTable.css'
import Axios from 'axios';
import jsPDF from 'jspdf';

const RaidSubTable = () => {

    const[submissiondata,setsubmissiondata]=useState([]);

    useEffect(()=>{
        getsubmissiondata();
    },[]);

    const getsubmissiondata =()=>{
        Axios.get('http://localhost:4000/api/RaidSubForm')
        .then(response=>{
            console.log('data from sever',response.data);
            setsubmissiondata(response.data.allRSub);
        })
        .catch(error=>{
            console.error('Axios error :',error);
        })
    }

    //delete
    const submissionDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteRSub', { _id: id })
            .then(response => {
                console.log('Submission deleted successfully');
                setsubmissiondata(prevData => prevData.filter(submission => submission._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Submission:', error);
      });
};

  return (
    <div className='Raid Submission Table'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Details</th>
                    <th>special notes</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {submissiondata && submissiondata.length > 0 ?(
                    submissiondata.map((submission)=>(
                <tr key={submission._id}>
                    <td>{submission.location}</td>
                    <td>{submission.details} </td>
                    <td>{submission.specialno}</td>

                    <td className='actionButtons'>
                        <button>Edit</button>
                    </td>
                    <td className='deleteButtons'>
                        <button onClick={() => submissionDelete(submission._id)} >Delete</button>
                    </td>
                </tr>
                    ))
                    ):(
                        <tr>
                            <td>You have not submission data</td>
                        </tr>  
                )}
            </tbody>
        </table>

       
    </div>
  )
}

export default RaidSubTable