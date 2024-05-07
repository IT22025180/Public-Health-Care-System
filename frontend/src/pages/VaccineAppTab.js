import React, { useEffect, useState } from 'react'
import '../styles/VaccineAppTab.css'
import Axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VaccineAppTab = () => {
    //state variables
    const [vaccineappdata, setvaccineappdata] = useState([]);


    const navigate = useNavigate();



    useEffect(() => {
        getvaccineappdata();
    }, []);

    const getvaccineappdata = () => {
        Axios.get('http://localhost:4000/api/VacccinesApp')
            .then(response => {
                console.log('data from server', response.data);
                setvaccineappdata(response.data.allVaccineAppointments);
            })
            .catch(error => {
                console.error("Axios error: ", error);
            })
    }


    //delete

    const deletevaccineappdata = (id) => {
        // Display SweetAlert confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // If confirmed, proceed with deletion
                Axios.post('http://localhost:4000/api/deleteVacApp', { _id: id })
                    .then(response => {
                        console.log('Vaccine Data deleted successfully');
                        setvaccineappdata(prevData => prevData.filter(vaccineapp => vaccineapp._id !== id));
                        // Display success message
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })

                    .catch(error => {
                        console.error('Error deleting vaccineappdata:', error);
                    });
            }
        });
    }

    //pdf generation  

    const generatePDF = (vaccineapp) => {
        const doc = new jsPDF();

        // Add Sri Lankan national logo
        const logo = new Image();
        logo.src = logo1; // Use the imported logo image
        doc.addImage(logo, 'PNG', 6, 7, 20, 20); // Adjust the position and dimensions as needed


        // Add Public Health Information System as the letterhead
        doc.setFontSize(12);
        doc.text('Public Health Information System', 70, 15); // Adjust the position as needed
        doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 70, 20);
        doc.text('Colombo 10, Sri Lanka.', 70, 25);
        doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 70, 30);

        // Add page border
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');

        // Add horizontal line
        doc.setLineWidth(0.5);
        doc.line(5, 45, 205, 45);

        // Vaccine registration summary topic
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text('Notice-Vaccination Programme', 70, 60); // Adjust the position as needed

        //appointment description

        const AppDescription = `
    There will be a crucial vaccination program scheduled on ${vaccineapp.date} at ${vaccineapp.location}. 
    This program plays a pivotal role in our ongoing efforts to combat infectious diseases by distributing 
    ${vaccineapp.v_name} vaccine to the designated patients. The successful execution of this initiative
     relies heavily on the coordinated efforts of our dedicated team.

    It is imperative that all assigned staff members arrive promptly before 8:00 AM
    to ensure the smooth operation of the event. Their presence and active participation
    are vital in administering vaccines efficiently and providing necessary assistance to 
    patients.

    Furthermore, proper preparation and adherence to safety protocols are paramount to guaranteeing 
    the health and well-being of both staff and patients. This includes maintaining 
    strict hygiene standardsensuring proper storage and handling of vaccines, and following 
    established procedures for patient care.
    
    `;

        doc.setFontSize(12);
        doc.text(AppDescription, 15, 75);

        // Date and signature
        const currentDate = new Date().toLocaleDateString('en-US');
        doc.setFontSize(12);
        doc.text(`Date: ${currentDate}`, 15, 170);
        doc.text('Signature:', 15, 180);

        // Save the PDF with a filename based on leave name
        doc.save(`Vaccine Appointment_${vaccineapp.v_name}.pdf`);





    };
    return (
        <Layout>
            <div className='adminClinic'>


                <Table border={1} cellPadding={10} cellSpacing={0}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Vaccine Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>PDF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vaccineappdata && vaccineappdata.length > 0 ? (
                            vaccineappdata.map((vaccineapp) => (
                                <TableRow key={vaccineapp._id}>
                                    <TableCell>{vaccineapp.v_name}</TableCell>
                                    <TableCell>{vaccineapp.quantity}</TableCell>
                                    <TableCell>{vaccineapp.date}</TableCell>
                                    <TableCell>{vaccineapp.location}</TableCell>

                                    <TableCell className='actionButtons'>
                                        {vaccineapp._id && vaccineapp.v_name && vaccineapp.quantity && vaccineapp.date && vaccineapp.location && (
                                            <button onClick={() => navigate(`/EditVApp/${vaccineapp._id}/${vaccineapp.v_name}/${vaccineapp.quantity}/${vaccineapp.date}/${vaccineapp.location}`)}><FaEdit /></button>

                                        )}

                                    </TableCell>

                                    <TableCell onClick={() => deletevaccineappdata(vaccineapp._id)} className='deleteButtons'>
                                        <button ><FaTrash /></button>
                                    </TableCell>

                                    <TableCell>
                                        <button className="pdfButton" onClick={() => generatePDF(vaccineapp)}>Generate PDF</button>
                                    </TableCell>


                                </TableRow>

                            ))

                        ) : (
                            <TableRow>
                                <TableCell>You have not added any vaccine Appointments</TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </div>
        </Layout>
    )
}

export default VaccineAppTab

