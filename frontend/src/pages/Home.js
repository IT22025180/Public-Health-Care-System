import React from 'react'
import Layout from '../components/Layout';
import { Button, Container } from 'react-bootstrap';
import '../styles/home.css';
import img from '../webImages/doctor.jpg';
import vimg from '../webImages/vacccine.jpg';
import dimg from '../webImages/dengue.jpg';
import cimg from '../webImages/complain.jpg';
import rimg from '../webImages/raids.jpg';

const Home = () => {
  return (
    <div>
      <Layout>
        <br/>
        <br/>
        <Container>
          <h1>Welcome to Public Helath Care System!!</h1>
          <div></div>
        </Container>
        <Container className='Hcontainer'>
          <div className='leftflex'>
            <div className='clinicsub'>
              <br/>
              <br/>
              <h2>Our Clinic schedules</h2>
              <p className='fs-5 text-center'>Public health Information system organizing a dengue & dental clinic services on giving dates click the button below to view and join the appointments</p>
              <Button>Click here </Button>
            </div>
            <br/>
            <img src={img} alt='clinics' width={300} height={300}/>
          </div>
        </Container>
        <br/>
        <Container className='container'>
          <div className='rightflex'>
          <img src={vimg} alt='vaccine' width={300} height={300}/>
            <div className='clinicsub'>
              <br/>
              <br/>
              <h2>Need a vaccination ? </h2>
              <p className='fs-5 text-center'>Public health Information system organizing a vaccination schedules for a children to adults click here to view details</p>
              <Button>Jump to vaccine page </Button>
            </div>
            <br/>
          </div>
        </Container>
        <br/>
        <Container className='container'>
          <div className='leftflex'>
            <div className='clinicsub'>
              <br/>
              <br/>
              <h2>Dengue programs</h2>
              <p className='fs-5 text-center'>Dengue is a threat for human beings. Click the button to give a complain or join for a campaigns</p>
              <Button>Click here</Button>
            </div>
            <br/>
            <img src={dimg} alt='dengue' width={300} height={300}/>
          </div>
        </Container>
        <br/>
        <Container className='container'>
          <div className='rightflex'>
          <img src={cimg} alt='complains' width={300} height={300}/>
            <div className='clinicsub'>
              <br/>
              <br/>
              <h2>Give a complain</h2>
              <p className='fs-5 text-center'>Is there any problem in your area to affect our health ? Click below button to add complains of unhealthy foods or dengue affected places</p>
              <Button>Complains </Button>
            </div>
            <br/>
           
          </div>
        </Container>
        <br/>
        <Container className='container'>
          <div className='leftflex'>
            <div className='clinicsub'>
            <br/>
              <br/>
              <h2>View our raids</h2>
              <p className='fs-5 text-center'>Click here to view some raids by our officers according to your complains</p>
              <Button>Click here </Button>
            </div>
            <br/>
            <img src={rimg} width={300} height={300} alt='raids'/>
          </div>
        </Container>
      </Layout>
    </div>
  )
}

export default Home;
