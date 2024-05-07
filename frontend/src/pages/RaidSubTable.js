import React, { useEffect, useState } from 'react';
import '../styles/RaidSubTable.css';
import Layout from '../components/Layout';
import Axios from 'axios';
import jsPDF from 'jspdf';
import { Link, useNavigate } from 'react-router-dom';


const RaidSubTable = () => {
    const [submissiondata, setSubmissionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getsubmissiondata();
    }, []);

    const getsubmissiondata = () => {
        Axios.get('http://localhost:4000/api/raidSub')
            .then(response => {
                console.log('data from sever', response.data);
                setSubmissionData(response.data.allRS);
            })
            .catch(error => {
                console.error('Axios error :', error);
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
    const filteredsubmissiondata = submissiondata.filter(Location => {
        return Location.vname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <Layout>
            <div className='RaidSubmissionTable'>
                <div className="search">
                    <input placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>

                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact No</th>
                            <th>Vialator NIC</th>
                            <th>Vialation type</th>
                            <th>Location</th>
                            <th>Details</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Generate PDF</th>
                            <th>FineAndCourt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredsubmissiondata && filteredsubmissiondata.length > 0 ? (
                            filteredsubmissiondata.map(submission => (
                                <tr key={submission._id}>
                                    <th>{submission.vname}</th>
                                    <th>{submission.vemail}</th>
                                    <th>{submission.vcno}</th>
                                    <th>{submission.vnic}</th>
                                    <th>{submission.vtype}</th>
                                    <th>{submission.location}</th>
                                    <th>{submission.details}</th>
                                    <tbody className='actionButtons'>

                                        <Link to={`/RaidSubFormEdit/${submission._id}/${submission.vname}/${submission.vemail}/${submission.vcno}
                                        /${submission.vnic}/${submission.vtype}/${submission.location}/${submission.details}`}>
                                            <button>Edit</button>
                                        </Link>

                                    </tbody>
                                    <th className='deleteButtons'>
                                        <button onClick={() => submissionDelete(submission._id)}>Delete</button>
                                    </th>
                                    <tbody>
                                        <button className="pdfButton" onClick={() => generatePDF(RaidSubTable)}>generatePDF</button>
                                    </tbody>
                                    <td>
                                        <button className="btn-primary" onClick={() => navigate(`/Fine-And-court-Submit-Reports/${submission.vname}/${submission.vemail}/${submission.vcno}
                                        /${submission.vnic}/${submission.vtype}/${submission.location}/${submission.details}`)}>FineAndCourt</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <th colSpan="5"><center>You have no submission data.</center></th>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </Layout>
    );
};


export default RaidSubTable;
