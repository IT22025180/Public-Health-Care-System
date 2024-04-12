import React, { useEffect, useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import Layout from '../components/Layout'
import '../styles/addPatient.css';
import Swal from 'sweetalert2'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import jspdf from 'jspdf';
import { motion } from 'framer-motion';

const AddPatients = () => {


  //const navigate = useNavigate();

  const { _id, date, time, venue, ctype } = useParams();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [open, openConfirm] = useState(false);

  const functionPopup = () => {

    if (!name || !gender || !address || !mobile) {
      setErrorMessage('Please fill all fields');
    } else if (age < 0) {
      setErrorMessage('Please add suitable age');
      return;
    } else {
      openConfirm(true);
    }
  }

  const closepopup = () => {
    openConfirm(false);
  }


  //generatePDF
  const confirmWithGetPDF = () => {

    if (!name || !gender || !address || !mobile) {
      setErrorMessage('No details to generate pdf');
      return;
    } else {
      const doc = new jspdf();
      let y = 10;

      const genPDF = `Public Health Information System\n\nPatient details\n\n 
                      Name : ${name}\n
                      Gender : ${gender}\n
                      Age : ${age}\n
                      Mobile : ${mobile}\n
                      Address : ${address}\n\n\n
                      Clinic details \n\n
                      Type : ${ctype}\n
                      Date : ${date}\n
                      Time : ${time}\n
                      Venue : ${venue}\n\n
                      Please be on time\tThank you
                      \n
                      Public Health Information Technical Team
                      `;
      doc.text(genPDF, 10, y);
      y += 50;

      doc.save(`${name}_${ctype}_appointment_report.pdf`);

    }
    addPatient();

  }
  const addPatient = async () => {
    openConfirm(false);
    try {
      const response = await Axios.post('http://localhost:4000/api/addPatients', {
        name,
        sex: gender,
        age,
        address,
        mobile,
        clinicID: _id
      });

      console.log('Patient added to queue successfully', response.data);

      setName('');
      setGender('');
      setAge(0);
      setAddress('');
      setMobile(0);

      Swal.fire({
        title: "Success!",
        text: "You have been appointed to queue!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });

    } catch (error) {
      console.error('Error:', error);
    }
  }



  return (
    <>
      <Layout>
        <motion.div className="progress-bar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className='addform'>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <h2>Admission form</h2>
            <Form>
              <Form.Group className='padd'>
                <p>Your Name</p>
                <Form.Control
                  type='text'
                  size='sm'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Group className='padd'>
                <p>Age</p>
                <Form.Control
                  type='number'
                  size='sm'
                  value={age}
                  min={0}
                  onChange={e => setAge(e.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Group className='padd'>
                <p>Gender</p>
                <Form.Control as='select' size='sm' value={gender} onChange={e => setGender(e.target.value)}>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group className='padd'>
                <p>Address :</p>
                <Form.Control
                  type='text'
                  size='sm'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Group className='padd'>
                <p>Mobile :</p>
                <Form.Control
                  type='number'
                  size='sm'
                  value={mobile}
                  min={0}
                  maxLength={10}
                  onChange={e => setMobile(e.target.value.slice(0, 10))}
                />
              </Form.Group>
              <br />
              <Button onClick={functionPopup}>Submit</Button>
            </Form>
          </div>
        </motion.div>
      </Layout>
      <Dialog open={open}>
        <DialogTitle>Appointment Confirmation</DialogTitle>
        <DialogContent>
          <Form>
            <h3>Your details</h3>
            <p>Name : {name}</p>
            <p>Gender : {gender}</p>
            <p>Age : {age}</p>
            <p>Mobile : {mobile}</p>
            <p>Address : {address}</p>
            <br />
            <h3>Clinic details</h3>
            <p>Type : {ctype}</p>
            <p>Date : {date}</p>
            <p>TIme : {time}</p>
            <p>Venue : {venue}</p>

            <Button onClick={addPatient}>Confirm appointment</Button>
            <Button onClick={confirmWithGetPDF}>Confirm with get pdf</Button>
            <Button onClick={closepopup}>Decline</Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPatients
