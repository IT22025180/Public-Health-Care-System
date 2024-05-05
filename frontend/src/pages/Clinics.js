import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import '../styles/Clinics.css';
//import { Button } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import '../styles/Clinics.css';
import imageDgC from '../webImages/dentalC.png';
import imageDtC from '../webImages/dngC.png';
import AddClinic from './AddClinic';
import Aos from 'aos';
import 'aos/dist/aos.css'; //anim
import { motion, useScroll } from 'framer-motion' //anim

const Clinics = () => {
  //const navigate = useNavigate();
  const cards = [
    {
      id: 1,
      title: 'Dengue Clinics',
      buttonText: 'Click here',
      buttonLink: '/dengueCli',
      className: 'dengueC-card',
      image: imageDtC,
      aosAnimation: 'fade-right'
    },
    {
      id: 2,
      title: 'Dental Clinics',
      buttonText: 'Click here',
      buttonLink: '/dentalCli',
      className: 'dentalC-card',
      image: imageDgC,
      aosAnimation: 'fade-left'
    }
  ];

  const user = localStorage.getItem('token');

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with your desired options //anim
  }, []);
  return (
    <Layout>
      <br />
      <div data-aos="fade-up" //anim
        data-aos-anchor-placement="center-bottom">

        <div className="home-page">
          <h1>Select Clinic Type</h1><br /><br />
          <div className="card-container" >
            {cards.map((card) => (
              <div key={card.id} className="Ccard" data-aos={card.aosAnimation}>
                <img src={card.image} alt={card.title} className="Ccard-image" />
                <div className="Ccard-body">
                  <h2 className="Ccard-title">{card.title}</h2>
                  <p className="Ccard-text">{card.description}</p>
                  <a href={card.buttonLink} className="btn btn-primary">
                    {card.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {user && <AddClinic />}
    </Layout >
  )
}

export default Clinics;
