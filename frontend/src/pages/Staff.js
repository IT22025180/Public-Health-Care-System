import React from 'react';
import Layout from '../components/Layout';
import '../styles/Staff.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

import image1 from '../webImages/den.png'
import image2 from '../webImages/vaccines.png'
import image3 from '../webImages/raids.png'

const Staff = () => {
  const navigate = useNavigate();

  const goToLeave = () => {
    navigate('/Leave');
  };

  const goToAllSchedules = () => {
    navigate('/Allschedules');
  };

  const cards = [
    {
      id: 1,
      title: 'Dengue Schedules',
      buttonText: 'View',
      buttonLink: '/Dengueschedules',
      className: 'dengue-card',
      image:image1
      
    },

    {
      id: 2,
      title: 'Vaccine Schedules',
      buttonText: 'View',
      buttonLink: '/Vaccineschedules',
      className: 'vaccine-card',
      image:image2
    },

    {
      id: 3,
      title: 'Raids Schedules',
      buttonText: 'View',
      buttonLink: '/Raidsschedules',
      className: 'raids-card',
      image:image3
    },

  
       
  ];

  
  return (
    <Layout>
          <div className="home-page">
            <h1>Staff Schedules</h1>
            <div className="card-container">
              {cards.map((card) => (
                <div key={card.id} className="card">
                  <img src={card.image} alt={card.title} className="card-image" />
                  <div className="card-body">
                    <h2 className="card-title">{card.title}</h2>
                    <p className="card-text">{card.description}</p>
                    <a href={card.buttonLink} className="btn btn-primary">
                      {card.buttonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </Layout>
);
};

export default Staff;
