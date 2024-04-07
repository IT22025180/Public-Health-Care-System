import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';

const Dengue = () => {
    const [dgClinics, setDgClinics] = useState([]);
    const navigate = useNavigate();

    const getDgClinics = async () => {
        try {
            const response = await Axios.get('http://localhost:4000/api/Clinics');
            const dengueClinicsData = response.data.allClinics.filter(clinic => clinic.ctype === 'Dengue');
            setDgClinics(dengueClinicsData);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    useEffect(() => {
        getDgClinics();
    }, []);

    return (
        <Layout>
            <div>
                <div className='titles'>
                    <h3>Dengue</h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Venue</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dgClinics && dgClinics.length > 0 ? (
                                    dgClinics.map((clinic) => (
                                        <TableRow key={clinic._id}>
                                            <TableCell>{clinic.date}</TableCell>
                                            <TableCell>{clinic.time}</TableCell>
                                            <TableCell>{clinic.venue}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => navigate(`/addpatients/${clinic._id}/${clinic.date}/${clinic.time}/${clinic.venue}/${clinic.ctype}`)}>Join</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>You have no Dengue Clinics added yet!!</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Layout>
    );
};

export default Dengue;
