import React, { useEffect, useState } from 'react'
import Axios  from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const Dental = () => {

    const [dtClinics , setdtClinics]=useState([]);

    const navigate = useNavigate();

    const getDtClinics = async() => {
      try{
          const response = await Axios.get('http://localhost:4000/api/Clinics')

          const dentalClinicsData = response.data.allClinics.filter(clinic => clinic.ctype === 'Dental');
          setdtClinics(dentalClinicsData);

          console.log('Products : ' , dtClinics.length);
      }catch(error){
          console.error('Axios error : ' , error);
      }
  } 

  useEffect(() => {
      getDtClinics();
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
                    {dtClinics && dtClinics.length > 0 ? (
                        dtClinics.map((clinic) => (
                            <TableRow key={clinic._id} sx = {{'&:last-child id, &:last-child th' : { border: 1}}}>

                                <TableCell>{clinic.date}</TableCell>
                                <TableCell>{clinic.time}</TableCell>
                                <TableCell>{clinic.venue}</TableCell>
                                <TableCell>
                                  <Button onClick={navtoAddp}>Add</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>You have no Dental Clinics added yet!!</TableCell>
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

export default Dental;
