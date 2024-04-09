import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Axios  from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PopupBody = styled('div')({
  padding: '10px',
});

const AdminClinic = () => {

    const [clinics,setClinics] = useState([]);
    const [patients,setPatients] = useState([]);
    const [joinedPatients, setJoinedPatients] = useState([]);
    const [clinictoUpdate , setClinicToUpdate] = useState(null);
    const [updateMode , setupdateMode] = useState(false);
    const navigate = useNavigate();

    const getClinics = async() => {
        try{
            const response = await Axios.get('http://localhost:4000/api/Clinics')

            console.log('Data from server: ' , response);
            setClinics(response.data.allClinics);

            console.log('Clinics : ' , clinics.length);
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


      const deleteClinic = async(id) => {
        Axios.post('http://localhost:4000/api/deleteClinic', { _id: id })
            .then(response => {
                setClinics(prevData => prevData.filter(clinics => clinics._id !== id))
                console.log('Clinic deleted successfully');
                
            })
            .catch(error => {
                console.error('Error deleting Clinic:', error);
        });
    };

    const confirmDelete = (id) => {

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
                deleteClinic(id);
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            }
        });
    }
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
                        clinics.map((clinic , index) => (
                            <TableRow key={clinic._id} sx = {{'&:last-child id, &:last-child th' : { border: 1}}}>

                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{clinic.date}</TableCell>
                                <TableCell>{clinic.time}</TableCell>
                                <TableCell>{clinic.ctype}</TableCell>
                                <TableCell>{clinic.venue}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/updateCli/${clinic._id}/${clinic.date}/${clinic.time}/${clinic.ctype}/${clinic.venue}`)}>Update</Button>
                                    <Button onClick={() =>confirmDelete(clinic._id) }>Delete</Button>
                                    <Button onClick={() => handleClickViewPatients(clinic._id)}>View joined patients</Button>
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
