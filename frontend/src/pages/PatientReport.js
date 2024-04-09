import React from 'react'
import Layout from '../components/Layout'
import { Button, Form } from 'react-bootstrap'
import '../styles/patientsReport.css';

const PatientReport = () => {
  return (
    <Layout>
      <div className='ptrep'>
        <div className='formptnt'>
            <h2>Patient report</h2>
            <p>Patient name</p>
            <Form.Group>
                <Form.Control
                type='text'/>
            </Form.Group>
        </div>
        <br/>
        <div className='formptnt'>
            <p>Patient sickness</p>
            <Form.Group>
                <Form.Control
                as='select' >
                    <option>Dengue</option>
                    <option>Dental</option>
                </Form.Control>
            </Form.Group>
        </div>
        <br/>
        <div className='formptnt'>
            <p>Patient Status</p>
            <Form.Group>
                <Form.Control
                type='text'
                />
            </Form.Group>
        </div>
        <br/>
        <Button>Generate report</Button>
      </div>
      </Layout>
  )
}

export default PatientReport;
