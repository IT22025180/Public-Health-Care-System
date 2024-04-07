import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Layout from '../components/Layout'
import '../styles/addPatient.css';
import Swal from 'sweetalert2'
import Axios from 'axios';

const AddPatients = ({ submitted, data }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState(0);

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
    try {
      const response = await Axios.post('http://localhost:4000/api/addPatients', {
        name,
        sex: gender,
        age,
        address,
        mobile
      });

      console.log('Patient added to queue successfully', response.data);
      Swal.fire({
        title: "Success!",
        text: "Added to queue successfully",
        icon: "success"
      });

      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Layout>
      <div className='addform'>
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
              onChange={e => setMobile(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button onClick={addPatient}>Submit</Button>
        </Form>
      </div>
    </Layout>
  )
}

export default AddPatients
