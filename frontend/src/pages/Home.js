import React, { useEffect } from 'react'
import Layout from '../components/Layout';
import { Button, Container } from 'react-bootstrap';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import img from '../webImages/doctor.jpg';
import vimg from '../webImages/vacccine.jpg';
import dimg from '../webImages/dengueM.jpg';
import cimg from '../webImages/complain.jpg';
import rimg from '../webImages/raids.jpg';
import Scli from '../webImages/Slideclinic.jpg';
import Svac from '../webImages/Slidevaccine.jpg';
import Ssta from '../webImages/Slidestaff.jpg';
import Sdeng from '../webImages/Slidedengue.jpg';
import Sraid from '../webImages/Slideraids.jpg';
import { motion } from 'framer-motion';
import Aos from 'aos';


const Home = () => {

  const scrollToSlideShow = () => {
    // Scroll to the slideshow container
    const slideShowContainer = document.getElementById('slideshow-container');
    slideShowContainer.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    Aos.init();
  }, []);

  const navigate = useNavigate();


  return (
    <div>
      <Layout>
        <motion.div className=''
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='contain'>

            <div className='slider-frame'>
              <div className='slider-img'>
                <div className='img-container'>
                  <img src={Scli} alt='clinic' width={1500} height={500} />
                </div>
                <div className='img-container'>
                  <img src={Svac} alt='vaccine' width={1500} height={500} />
                </div>
                <div className='img-container'>
                  <img src={Ssta} alt='Stafff' width={1500} height={500} />
                </div>
                <div className='img-container'>
                  <img src={Sdeng} alt='dengue' width={1500} height={500} />
                </div>
                <div className='img-container'>
                  <img src={Sraid} alt='raid' width={1500} height={500} />
                </div>
              </div>
              <div className='overlay-item'>
                <h1 className='overlay-text'>Welcome to Public Health Information System</h1>
                <Button className='btn-home' onClick={scrollToSlideShow}>More Info</Button>
              </div>
            </div>
          </div>
          <Container id='slideshow-container' className='Lcontainer'
          >
            <div className='leftflex' data-aos="fade-left">
              <div className='clinicsub'>
                <br />
                <br />
                <h2>Our Clinic schedules</h2>
                <p className='fs-5 text-center'>Public health Information system organizing a dengue & dental clinic services on giving dates click the button below to view and join the appointments</p>
                <Button onClick={() => navigate(`/clinics`)}>Click here </Button>
              </div>
              <br />
              <img src={img} alt='clinics' width={300} height={300} />
            </div>
          </Container>
          <br />
          <Container className='Rcontainer' data-aos="fade-right">
            <div className='rightflex'>
              <img src={vimg} alt='vaccine' width={300} height={300} />
              <div className='clinicsub'>
                <br />
                <br />
                <h2>Need a vaccination ? </h2>
                <p className='fs-5 text-center'>Public health Information system organizing a vaccination schedules for a children to adults click here to view details</p>
                <Button onClick={() => navigate(`/vaccines`)}>Click here </Button>
              </div>
              <br />
            </div>
          </Container>
          <br />
          <Container className='Lcontainer' data-aos="fade-left">
            <div className='leftflex'>
              <div className='clinicsub'>
                <br />
                <br />
                <h2>Dengue programs</h2>
                <p className='fs-5 text-center'>Dengue is a threat for human beings. Click the button to give a complain or join for a campaign</p>
                <Button onClick={() => navigate(`/dengueCamp`)}>Click here</Button>
              </div>
              <br />
              <img src={dimg} alt='dengue' width={300} height={300} />
            </div>
          </Container>
          <br />
          <Container className='Rcontainer'>
            <div className='rightflex'>
              <img src={cimg} alt='complains' width={300} height={300} />
              <div className='clinicsub'>
                <br />
                <br />
                <h2>Give a complain</h2>
                <p className='fs-5 text-center'>Is there any problem in your area to affect our health ? Click below button to add complains of unhealthy foods or dengue affected places</p>
                <Button onClick={() => navigate(`/Complains`)}>Complains </Button>
              </div>
              <br />

            </div>
          </Container>
          <br />
          <Container className='Lcontainer'>
            <div className='leftflex'>
              <div className='clinicsub'>
                <br />
                <br />
                <h2>View our raids</h2>
                <p className='fs-5 text-center'>Click here to view some raids by our officers according to your complains</p>
                <Button onClick={() => navigate(`/RF`)}>Click here </Button>
              </div>
              <br />
              <img src={rimg} width={300} height={300} alt='raids' />
            </div>
          </Container>
        </motion.div>
      </Layout>
    </div>
  )
}

export default Home;
