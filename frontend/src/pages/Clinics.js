import React from 'react'
import Layout from '../components/Layout'
import '../styles/Clinics.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PatientReport from './PatientReport';
import '../styles/Clinics.css';
import imageDgC from '../webImages/dentalC.png';
import imageDtC from '../webImages/dngC.png';

const Clinics = () => {
  const navigate = useNavigate();

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

  return (
    <Layout>
      <div className="home-page">
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
      <PatientReport />
    </Layout>
  )
}

export default Clinics;
