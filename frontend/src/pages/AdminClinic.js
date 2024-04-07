import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Axios  from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AdminClinic = () => {
    const [clinics,setClinics] = useState([]);

    const getClinics = async() => {
        try{
            const response = await Axios.get('http://localhost:4000/api/Clinics')

            console.log('Data from server: ' , response);
            setClinics(response.data.allClinics);

            console.log('Products : ' , clinics.length);
        }catch(error){
            console.error('Axios error : ' , error);
        }
    } 

    useEffect(() => {
        getClinics();
    },[]);
  return (
    <>
        <Layout>
        <div>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Venue</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clinics && clinics.length > 0 ? (
                        clinics.map((cli) => (
                            <TableRow key={cli._id} sx = {{'&:last-child id, &:last-child th' : { border: 1}}}>

                                <TableCell>{cli.date}</TableCell>
                                <TableCell>{cli.time}</TableCell>
                                <TableCell>{cli.ctype}</TableCell>
                                <TableCell>{cli.venue}</TableCell>
                                <TableCell>
                                    <Button >Update</Button>
                                    <Button >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>You have no clinics  yet!!</TableCell>
                        </TableRow>
                    ) }
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        </Layout>
    </>
  )
}

export default AdminClinic
