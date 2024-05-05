import React, { useEffect } from 'react';
import '../styles/RaidsHome.css';
import Layout from '../components/Layout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import img1 from '../webImages/raid f.jpg';
import img2 from '../webImages/raid s.jpg';


const RaidsHome = () => {
  const cards = [
    {
      id: 1,
      title: 'Raid Submit Form',
      image: img2,
      buttonText: 'View',
      buttonLink: '/raidsubform',
      aosAnimation: 'fade-right'
    },
    {
      id: 2,
      title: 'Add Raid officers',
      image: img2,
      buttonText: 'View',
      buttonLink: '/RaidOfficerAssign',
      aosAnimation: 'fade-left'
    }
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <div className="Rhome-page">
        <h1>Raids Management</h1>
        <div className="Rcard-container">
          {cards.map((card) => (
            <div key={card.id} className="Rcard" data-aos={card.aosAnimation}>
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
        <div className="raidhome" data-aos="fade-up">
          <div className="rhome" data-aos="fade-up">
            <h2 data-aos="fade-up">Raid Management </h2>
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