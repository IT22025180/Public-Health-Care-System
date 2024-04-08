import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Axios  from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

const PopupBody = styled('div')({
  padding: '10px',
});

const AdminClinic = () => {

    const [clinics,setClinics] = useState([]);
    const [patients,setPatients] = useState([]);
    const [joinedPatients, setJoinedPatients] = useState([]);

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

    const getPatients = async() => {
        try{
            const response = await Axios.get('http://localhost:4000/api/Patients')

            console.log('Patients data from server :' , response)
            setPatients(response.data.allPatient);
            
            console.log('Patients : ' , patients.length);
        }catch(error){
            console.error('Axios error : ' , error);
        }
    }

    useEffect(() => {
        getPatients();
    },[]);

    const handleClickViewPatients = async(id) => {
    
        const filteredPatients = patients.filter(patient => patient._id === id);
        setJoinedPatients(filteredPatients);
      };


  return (
    <>
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
                        clinics.map((cli , index) => (
                            <TableRow key={cli._id} sx = {{'&:last-child id, &:last-child th' : { border: 1}}}>

                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{cli.date}</TableCell>
                                <TableCell>{cli.time}</TableCell>
                                <TableCell>{cli.ctype}</TableCell>
                                <TableCell>{cli.venue}</TableCell>
                                <TableCell>
                                    <Button>Update</Button>
                                    <Button>Delete</Button>
                                    <Button onClick={() => handleClickViewPatients(cli._id)}>View joined patients</Button>
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
        <BasePopup open={joinedPatients.length > 0} onClose={() => setJoinedPatients([])} anchor={null}>
        <PopupBody>
          <h2>Patients joined for Clinic</h2>
          <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {joinedPatients && joinedPatients.length > 0 ? (
                        joinedPatients.map((patient,index) => (
                            <TableRow key={patient._id} sx = {{'&:last-child id, &:last-child th' : { border: 1}}}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.sex}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.email}</TableCell>
                                <TableCell>{patient.mobile}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>You have no patients to this clinic yet!!</TableCell>
                        </TableRow>
                    ) }
                </TableBody>
            </Table>
        </TableContainer>
          
        </PopupBody>
      </BasePopup>
        </Layout>
    </>
  )
}

export default AdminClinic
