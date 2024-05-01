import React from 'react'
import Layout from '../components/Layout'
import '../styles/Clinics.css';
//import { Button } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import '../styles/Clinics.css';
import imageDgC from '../webImages/dentalC.png';
import imageDtC from '../webImages/dngC.png';
import AddClinic from './AddClinic';
import { motion, useScroll } from 'framer-motion'

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
    },
    {
      id: 2,
      title: 'Dental Clinics',
      buttonText: 'Click here',
      buttonLink: '/dentalCli',
      className: 'dentalC-card',
      image: imageDgC,
    }
  ];

  const user = localStorage.getItem('token');

  return (
    <Layout>
      <motion.div className=''
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <br />
        <div className="home-page">
          <h1>Select Clinic Type</h1><br /><br />
          <div className="card-container">
            {cards.map((card) => (
              <div key={card.id} className="Ccard">
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
      </motion.div>
      {user && <AddClinic />}
    </Layout>
  )
}

export default Clinics;
