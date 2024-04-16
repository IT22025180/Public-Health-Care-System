import React, { useEffect, useState } from 'react';
import '../styles/RaidSubTable.css';
import Layout from '../components/Layout';
import Axios from 'axios';
import jsPDF from 'jspdf';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const RaidSubTable = () => {
    const [submissiondata, setSubmissionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();


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
   

    const generatePDF = () => {
        const doc = new jsPDF();
        let yPos = 20;

        doc.text("Raid Submission Report", 20, 10);

        submissiondata.forEach((submission, index) => {
            yPos = yPos + 10;
            doc.text(`Location: ${submission.location}`, 20, yPos);
            yPos = yPos + 10;
            doc.text(`Details: ${submission.details}`, 20, yPos);
            yPos = yPos + 10;
            doc.text(`Special Notes: ${submission.specialNotes}`, 20, yPos);
            yPos = yPos + 10;

            if (index !== submissiondata.length - 1 && yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
        });

        doc.save("RaidSubmissionReport.pdf");
        // Reset the submission data back to original after generating PDF
        getsubmissiondata();
    };
 // Filter submission data based on search query
 const filteredsubmissiondata = submissiondata.filter(Location=> {
    return Location.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

    return (
        <Layout>
            <div className='RaidSubmissionTable'>
            <div className="search">
            <input  placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                <TableContainer component={Paper}>
                <Table border={1} cellPadding={10} cellSpacing={0}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Special Notes</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Generate PDF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredsubmissiondata && filteredsubmissiondata.length > 0 ? (
                            filteredsubmissiondata.map(submission => (
                                <TableRow key={submission._id}>
                                    <TableCell>{submission.location}</TableCell>
                                    <TableCell>{submission.details}</TableCell>
                                    <TableCell>{submission.specialNotes}</TableCell>
                                    <TableBody className='actionButtons'>
                
                                        <Link to ={`/RaidSubFormEdit/${submission._id}/${submission.location}/${submission.details}/${submission.specialNotes}`}>
                                        <button>Edit</button>
                                        </Link>

                                    </TableBody>
                                    <TableCell className='deleteButtons'>
                                        <button onClick={() => submissionDelete(submission._id)}>Delete</button>
                                    </TableCell>
                                    <TableBody> 
                        <button className="pdfButton" onClick={() =>generatePDF(RaidSubTable)}>generatePDF</button>
                        </TableBody>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="5"><center>You have no submission data.</center></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        </Layout>
    );
};


export default RaidSubTable;
