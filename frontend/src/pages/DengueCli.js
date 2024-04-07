import React, { useEffect, useState } from 'react'
import {} from 'react-bootstrap';
import Layout from '../components/Layout';
import Axios  from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dengue = () => {

    const [dgClinics , setdgClinics]=useState([]);

    const navigate = useNavigate();

    const getDgClinics = async() => {
      try{
          const response = await Axios.get('http://localhost:4000/api/Clinics')

          const dengueClinicsData = response.data.allClinics.filter(clinic => clinic.ctype === 'Dengue');
          setdgClinics(dengueClinicsData);

          console.log('Products : ' , dgClinics.length);
      }catch(error){
          console.error('Axios error : ' , error);
      }
  } 

  useEffect(() => {
      getDgClinics();
  },[]);

  const navtoAddp = () => {
    navigate('/addpatients');
  }

  return (
    <Layout>
        <div>
        <div className='titles'>
            <h3>Dengue</h3>

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
                    {dgClinics && dgClinics.length > 0 ? (
                        dgClinics.map((clinic) => (
                            <TableRow key={clinic._id} sx = {{'&:last-child id, &:last-child th' : { border: 1}}}>

                                <TableCell>{clinic.date}</TableCell>
                                <TableCell>{clinic.time}</TableCell>
                                <TableCell>{clinic.venue}</TableCell>
                                <TableCell>
                                    <Button onClick={navtoAddp}>Join</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>You have no Dengue Clinics added yet!!</TableCell>
                        </TableRow>
                    ) }
                </TableBody>
            </Table>
        </TableContainer>
            
        </div>
        </div>
    </Layout>
  )
}

export default Dengue;
