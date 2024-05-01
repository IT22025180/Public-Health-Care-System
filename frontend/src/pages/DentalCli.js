import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dental = () => {

    const [dtClinics, setdtClinics] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const getDtClinics = async () => {
        try {
            const response = await Axios.get('http://localhost:4000/api/Clinics')

            const dentalClinicsData = response.data.allClinics.filter(clinic => clinic.ctype === 'Dental');
            setdtClinics(dentalClinicsData);

            console.log('Products : ', dtClinics.length);
        } catch (error) {
            console.error('Axios error : ', error);
        }
    }

    useEffect(() => {
        getDtClinics();
    });

    const filteredDTClinicData = dtClinics.filter(clinic => {
        return clinic.venue.toLowerCase().includes(searchQuery.toLowerCase());
    })

    return (
        <Layout>
            <motion.div className="progress-bar"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <div className='titles'>
                        <h3>Dengue</h3><br />
                        <input placeholder="Search doctor name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><br />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date </TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredDTClinicData && filteredDTClinicData.length > 0 ? (
                                        filteredDTClinicData.map((clinic) => (
                                            <TableRow key={clinic._id} sx={{ '&:last-child id, &:last-child th': { border: 1 } }}>

                                                <TableCell>{new Date(clinic.date).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(clinic.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                                <TableCell>{clinic.venue}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => navigate(`/addpatients/${clinic._id}/${clinic.date}/${clinic.time}/${clinic.venue}/${clinic.ctype}`)}>Join</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7}>You have no Dental Clinics added yet!!</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </div>
            </motion.div>
        </Layout>
    )
}

export default Dental;
