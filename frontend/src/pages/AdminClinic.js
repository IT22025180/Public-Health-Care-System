import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminClinic = () => {
    const [clinics, setClinics] = useState([]);
    const [selectedClinicId, setSelectedClinicId] = useState(null);
    const [joinedPatients, setJoinedPatients] = useState([]);
    const navigate = useNavigate();

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

    const handleClickViewPatients = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:4000/api/Clinics/${id}/patients`);
            setJoinedPatients(response.data.joinedPatients);
            setSelectedClinicId(id);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

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
                            {clinics.map((clinic, index) => (
                                <React.Fragment key={clinic._id}>
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{clinic.date}</TableCell>
                                        <TableCell>{clinic.time}</TableCell>
                                        <TableCell>{clinic.ctype}</TableCell>
                                        <TableCell>{clinic.venue}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => navigate(`/updateCli/${clinic._id}/${clinic.date}/${clinic.time}/${clinic.ctype}/${clinic.venue}`)}>Update</Button>
                                            <Button onClick={() => confirmDelete(clinic._id)}>Delete</Button>
                                            <Button onClick={() => handleClickViewPatients(clinic._id)}>View joined patients</Button>
                                        </TableCell>
                                    </TableRow>
                                    {selectedClinicId === clinic._id && (
                                        <TableRow>
                                            <TableCell colSpan={6}>
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
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
};

export default AdminClinic;
