import React, { useEffect, useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import Layout from '../components/Layout'
import '../styles/addPatient.css';
import Swal from 'sweetalert2'
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddPatients = ({ submitted, data }) => {


  const navigate = useNavigate();

  const { _id, date, time, venue, ctype } = useParams();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!submitted) {
      setName('');
      setGender('');
      setAge(0);
      setAddress('');
      setMobile(0);
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setName(data.name);
      setGender(data.gender);
      setAge(data.age);
      setAddress(data.address);
      setMobile(data.mobile);
    }
  }, [data]);

  const addPatient = async () => {


    if (!name || !gender || !address || !mobile) {
      setErrorMessage('Please fill all fields');
    }


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

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const confirmJoin = () => {

    Swal.fire({
      title: "Are you sure?",
      text: name + " you will join " + ctype + " clinic on " + date + " at " + time,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "It's ok Join me!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
          text: "Successfully joined to " + ctype + " clinic on " + date + " at " + venue,
          icon: "success"
        });
        addPatient();
        if (addPatient()) {
          setName('');
          setGender('');
          setAge(0);
          setAddress('');
          setMobile(0);
        }

      }

    });

  }

  return (
    <Layout>
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
              onChange={e => setAge(e.target.value)}
            />
          </Form.Group>
          <br />
          <Form.Group className='padd'>
            <p>Sex</p>
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
          <Button onClick={confirmJoin}>Submit</Button>
        </Form>
      </div>
    </Layout>
  )
}

export default AddPatients
