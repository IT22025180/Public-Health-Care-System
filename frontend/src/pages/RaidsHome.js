import React from 'react';
import '../styles/RaidsHome.css';
import Layout from '../components/Layout';

import img1 from '../webImages/raid f.jpg';
import img2 from '../webImages/raid s.jpg';

const RaidsHome = () => {
  const cards = [
    {
      id: 1,
      title: 'Raid Form',
      image: img1,
      buttonText: 'View',
      buttonLink: '/RF'
    }, 
    {
      id: 2,
      title: 'Raid Submit Form',
      image: img2,
      buttonText: 'View',
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
              <div className="raidhome">
            <div className="rhome">
                <h2>Raid Management </h2>
                <h3>For low enforcement to handle raids effectively,the Raid Management System is User-Friendly</h3>
                <p><center>A Raid Management system combines multiple disk drives into a single unit to enhance data storage reliability and performance<br></br>
                It employs various configurations (RAID levels) to distribute data across drives, providing benefits like increased speed, fault tolerance, and data redundancy.<br></br>
                    
                      </center></p>
            </div>
          
        </div>
          
          


    </div>
        </Layout>  



    )
}
export default RaidsHome;