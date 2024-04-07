import React from 'react';
import Layout from '../components/Layout';
import '../styles/Staff.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import '../styles/Staff.css'

import image1 from '../webImages/den.png'
import image2 from '../webImages/va2.png'
import image3 from '../webImages/raids.png'

const Staff = () => {
  const navigate = useNavigate();


  const cards = [
    {
      id: 1,
      title: 'Dengue Schedules',
      buttonText: 'View',
      buttonLink: '/Dengueschedules',
      className: 'dengue-card',
      image: image1
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
      image: image3
      
    },
  ];

  const ApplyLeave = () => {
    // Navigate to the leave application page
    navigate('/Leave');
  };
  
  return (
    <Layout>
      <div className="home-page">
        <h3>Staff Schedules</h3>
        <div className="card-container">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.description}</p>
                <a href={card.buttonLink} className="btnview">
                  {card.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
        <hr className="horizontal-line" />

        <div className="apply-leave-box">
          <button onClick={ApplyLeave}>Apply for Leave</button>
          <h3 className='applyleave'>Please fill this form to apply for your leave.</h3>
          <button onClick={ApplyLeave}>Click here</button>
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
