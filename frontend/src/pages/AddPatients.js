import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Layout from '../components/Layout'
import '../styles/addPatient.css';

const AddPatients = ({submitted , data}) => {

  //const []
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
            />
        </Form.Group>
        <br/>
        <Form.Group className='padd'>
        <p>Age</p>
            <Form.Control
            type='number'
            size='sm'/> 
        </Form.Group>
        <br/>
        <Form.Group className='padd'>
        <p>Sex</p>
            <Form.Control as='select' size='sm'>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            </Form.Control>
        </Form.Group>
        <br/>
        <Form.Group className='padd'>
        <p>Address : </p>
            <Form.Control
            type='text'
            size='sm'/> 
        </Form.Group>
        <br/>
        <Form.Group className='padd'>
        <p>Mobile : </p>
            <Form.Control
            type='number'
            size='sm'/> 
        </Form.Group>
        <br/>
        <Button>Submit</Button>
      </Form>
    </div>
    
    </Layout>
  )
}

export default AddPatients
