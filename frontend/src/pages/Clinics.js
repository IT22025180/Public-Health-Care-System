import React from 'react'
import Layout from '../components/Layout'
import '../styles/Clinics.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PatientReport from './PatientReport';


const Clinics = () => {

  const navigate = useNavigate();


  const dengue = () => {
    navigate('/dengueCli');
  }

  const dental = () => {
    navigate('/dentalCli');
  }

  return (
    <Layout>
      <div className='sctBox'>
        <div className='dengue'>
          <Button onClick={dengue}>Dengue</Button>
        </div>
        <div className='dental'>
        <Button onClick={dental}>Dental</Button>
        </div>
      </div>
      <PatientReport/>
    </Layout>
  )
}

export default Clinics;
