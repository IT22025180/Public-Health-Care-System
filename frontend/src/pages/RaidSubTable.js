import React, { useEffect, useState } from 'react';
import '../styles/RaidSubTable.css';
import Layout from '../components/Layout';
import Axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const RaidSubTable = () => {
    const [submissiondata, setSubmissionData] = useState([]);

    useEffect(()=>{
        getsubmissiondata();
    },[]);

    const getsubmissiondata =()=>{
        Axios.get('http://localhost:4000/api/raidSub')
        .then(response=>{
            console.log('data from sever',response.data);
            setSubmissionData(response.data.allRS);
        })
        .catch(error=>{
            console.error('Axios error :',error);
        })
    }

    //delete
    const submissionDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteRS', { _id: id })
            .then(response => {
                console.log('Submission deleted successfully');
                // Filter out the deleted submission from the current state
                const updatedSubmissionData = submissiondata.filter(submission => submission._id !== id);
                // Update the state with the filtered data
                setSubmissionData(updatedSubmissionData);
            })
            .catch(error => {
                console.error('Axios error:', error);
            });
    };

    return (
        <Layout>
            <div className='RaidSubmissionTable'>
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Details</th>
                            <th>Special Notes</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissiondata && submissiondata.length > 0 ? (
                            submissiondata.map(submission => (
                                <tr key={submission._id}>
                                    <td>{submission.location}</td>
                                    <td>{submission.details}</td>
                                    <td>{submission.specialNotes}</td>
                                    <td className='actionButtons'>
                
                                        <Link to ={`/RaidSubFormEdit/${submission._id}/${submission.location}/${submission.details}/${submission.specialNotes}`}>
                                        <button>Edit</button>
                                        </Link>

                                    </td>
                                    <td className='deleteButtons'>
                                        <button onClick={() => submissionDelete(submission._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5"><center>You have no submission data.</center></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};


export default RaidSubTable;
