import React, { useEffect, useState } from 'react';
import '../styles/Complainstable.css';
import Layout from "../components/Layout";
import Axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Complainstable = () => {
    const navigate = useNavigate();

    const [complainsdata, setComplainsdata] = useState([]);
    //search
    const [searchQuery, setSearchQuery] = useState('');

    const getComplainsdata = () => {
        Axios.get('http://localhost:4000/api/Complain')
            .then(response => {

                console.log('data from sever', response.data);
                setComplainsdata(response.data);
            })
            .catch(error => {
                console.error("Axios error:", error);
            })
    }

    useEffect(() => {
        getComplainsdata();
    }, []);

    //delete

    const ComplainsDdelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteComplain', { _id: id })
            .then(response => {
                console.log('ComplainData deleted successfully');
                setComplainsdata(prevData => prevData.filter(Complains => Complains._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Complaindata:', error);
            });
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                ComplainsDdelete(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });

    };


    //search
    const filteredComplainsData = complainsdata.filter(Complains => {
        return Complains.fname.toLowerCase().includes(searchQuery.toLowerCase());
    });
    
    const generatePDF = (Complains) => {
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
    
        // Leave summary topic
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text('Complain Summery', 90, 60);

        let xPos = 15;
        let yPos = 185; // Fixed yPos for all images
        const verticalSpacing = 10; // Adjust vertical spacing between rows
        if (Array.isArray(Complains.images)) {
            Complains.images.forEach((image, index) => {
                if (index > 0 && index % 2 === 0) {
                    yPos += 50; // Move to the next row
                    xPos = 15; // Reset xPos for the new row
                }
                const imageData = `data:${image.contentType};base64,${image.data}`;
                doc.addImage(imageData, 'JPEG', xPos, yPos, 60, 40); // Adjust dimensions as needed
                xPos += 80; // Adjust horizontal spacing between images
            });

        } else {
            doc.text('No images available', 15, 70);
        };

        doc.text(Complains.fname, 15, 80);
        doc.text(Complains.lname, 15, 90);
        doc.text(Complains.mobile.toString(), 15, 100);
        doc.text(Complains.email, 15, 110);
        doc.text(Complains.NIC, 15, 120); 
        doc.text(Complains.date, 15, 130); 
        doc.text(Complains.yaddress, 15, 140); 
        //doc.text(Complains.images, 15, 150);
        doc.text(Complains.ctype, 15, 160);
        doc.text(Complains.cdesc, 15, 170);
        doc.text(Complains.area, 15, 180);

        doc.save(`Complain_Summary_${Complains.fname}.pdf`);
    };

    console.log(complainsdata.length);
    return (
        <Layout>
        <div className='Complainstable'>



            {<input placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />}

            <TableContainer component={Paper}>
                <Table border={1} cellPadding={10} cellSpacing={0}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>NIC</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Complain Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Area</TableCell>
                            <TableCell>Images</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredComplainsData && filteredComplainsData.length > 0 ? (
                            filteredComplainsData.map((Complains) => (
                                <TableRow key={Complains._id}>
                                    <TableCell>{Complains.fname}</TableCell>
                                    <TableCell>{Complains.lname} </TableCell>
                                    <TableCell>{Complains.mobile} </TableCell>
                                    <TableCell>{Complains.email}</TableCell>
                                    <TableCell>{Complains.NIC}</TableCell>
                                    <TableCell>{Complains.yaddress}</TableCell>
                                    <TableCell>{Complains.ctype}</TableCell>
                                    <TableCell>{Complains.cdesc}</TableCell>
                                    <TableCell>{Complains.area}</TableCell>
                                    <TableCell>
                                        {Array.isArray(Complains.images) ? (
                                            Complains.images.map((image, index) => (
                                                <div className="imge" key={index} style={{ width: "50px", height: "100px" }}>
                                                    <img src={`data:${image.contentType};base64,${image.data}`} alt={`Image`} width={50} height={50} />
                                                </div>
                                            ))
                                        ) : (
                                            <div>No images available</div>
                                        )}
                                    </TableCell>


                                    <TableCell >
                                    <Button onClick={() => navigate(`/updateComp/${Complains._id}/${Complains.fname}/${Complains.lname}/${Complains.mobile}/${Complains.email}/${Complains.NIC}/${Complains.yaddress}/${Complains.ctype}/${Complains.cdesc}`)}><FaEdit /></Button>
                                        <Button onClick={() => confirmDelete(Complains._id)}><FaTrash /></Button>
                                        <button className="pdfButton" onClick={() => generatePDF(Complains)}>Generate PDF</button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell>You have no Complains data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </Layout>
    )
}

export default Complainstable

/*
 layout deka
 confirmdelete from kaveesha's babytable
 search
 form css
 images css display flex direction row
 
*/