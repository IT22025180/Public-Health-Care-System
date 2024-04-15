import React from 'react';
import '../styles/RaidsHome.css';
import Layout from '../components/Layout';

import img1 from '../webImages/Reportimg.jpg';

const RaidsHome = () => {
  const cards = [
    {
      id: 1,
      title: 'Raid Form',
      image: img1,
      buttonText: 'Submit',
      buttonLink: '/RF'
    }, 
    {
      id: 2,
      title: 'Raid Submit Form',
      image: img1,
      buttonText: 'Submit',
      buttonLink: '/raidsubform'
    }
  ];

  return (
      <Layout>  
            <div className="Rhome-page">
              <h1>Raids Management</h1>
              <div className="Rcard-container">
                {cards.map((card) => (
                  <div key={card.id} className="Rcard">
                    <img src={card.image} alt={card.title} className="Rcard-image" />
                    <div className="Rcard-body">
                      <h2 className="Rcard-title">{card.title}</h2>
                      <p className="Rcard-text">{card.description}</p>
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

export default RaidsHome;