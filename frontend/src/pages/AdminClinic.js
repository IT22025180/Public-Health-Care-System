import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaCut, FaTimes } from 'react-icons/fa';

const AdminClinic = () => {
    const [clinics, setClinics] = useState([]);
    //const [selectedClinicId, setSelectedClinicId] = useState(null);
    const [joinedPatients, setJoinedPatients] = useState([]);
    const navigate = useNavigate();

    //popup components line 16 to line 24 & line 123 to line 153
    const [open, openPatients] = useState(false);

    const functionPopup = () => {
        openPatients(true);
    }

    const closepopup = () => {
        openPatients(false);
    }

    const getClinics = async () => {
        try {
            const response = await Axios.get('http://localhost:4000/api/Clinics');
            setClinics(response.data.allClinics);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    useEffect(() => {
        getClinics();
    }, []);

    const getPatients = async () => {
        try {
            const response = await Axios.get(`http://localhost:4000/api/Patients`);
            setJoinedPatients(response.data.allPatient);
            //setSelectedClinicId(id);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    useEffect(() => {
        getPatients();
    }, []);

    const deleteClinic = async (id) => {
        try {
            await Axios.post('http://localhost:4000/api/deleteClinic', { _id: id });
            setClinics((prevClinics) => prevClinics.filter((clinic) => clinic._id !== id));
            console.log('Clinic deleted successfully');
        } catch (error) {
            console.error('Error deleting Clinic:', error);
        }
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
                deleteClinic(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });
    };

    return (
        <Layout>
            <div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Venue</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clinics && clinics.length > 0 ? (
                                clinics.map((clinic, index) => (

                                    <TableRow key={clinic._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{clinic.date}</TableCell>
                                        <TableCell>{clinic.time}</TableCell>
                                        <TableCell>{clinic.ctype}</TableCell>
                                        <TableCell>{clinic.venue}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => navigate(`/updateCli/${clinic._id}/${clinic.date}/${clinic.time}/${clinic.ctype}/${clinic.venue}`)}>Update</Button>
                                            <Button onClick={() => confirmDelete(clinic._id)}>Delete</Button>
                                            <Button onClick={functionPopup} >View joined patients</Button>
                                        </TableCell>
                                    </TableRow>))
                            ) : (
                                <TableRow >
                                    <TableCell colSpan={5}> No added clinics yet</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} fullWidth>
                    <DialogTitle>Patients for that clinic <Button onClick={closepopup}><FaTimes /></Button></DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Age</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Mobile</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {joinedPatients.map((patient, index) => (
                                        <TableRow key={patient._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{patient.name}</TableCell>
                                            <TableCell>{patient.sex}</TableCell>
                                            <TableCell>{patient.age}</TableCell>
                                            <TableCell>{patient.email}</TableCell>
                                            <TableCell>{patient.mobile}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    );
};

export default AdminClinic;


/**<TableContainer component={Paper}>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>#</TableCell>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell>Gender</TableCell>
                                                                <TableCell>Age</TableCell>
                                                                <TableCell>Email</TableCell>
                                                                <TableCell>Mobile</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {joinedPatients.map((patient, index) => (
                                                                <TableRow key={patient._id}>
                                                                    <TableCell>{index + 1}</TableCell>
                                                                    <TableCell>{patient.name}</TableCell>
                                                                    <TableCell>{patient.sex}</TableCell>
                                                                    <TableCell>{patient.age}</TableCell>
                                                                    <TableCell>{patient.email}</TableCell>
                                                                    <TableCell>{patient.mobile}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                
                                                
                                                
                                                {}*/