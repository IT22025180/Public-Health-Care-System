import React from 'react'
import Layout from '../components/Layout'
import '../styles/Clinics.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PatientReport from './PatientReport';
import '../styles/Clinics.css';
import imageDgC from '../webImages/dentalC.jpg';
import imageDtC from '../webImages/dngC.jpg';



const Clinics = () => {

  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: 'Dengue Clinics',
      buttonText: 'Click here',
      buttonLink: '/dengueCli',
      className: 'dengueC-card',
      image: imageDgC
    },

    {
      id: 2,
      title: 'Dental Clinics',
      buttonText: 'Click here',
      buttonLink: '/dentalCli',
      className: 'dentalC-card',
      image:imageDtC
    }
  ];

  return (
    <Layout>
      <div className="card-container">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.image} alt={card.title} className="cardC-image" />
              <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.description}</p>
                <a href={card.buttonLink} className="btnviewC">
                  {card.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      <PatientReport/>
    </Layout>
  )
}

export default Clinics;
