import React, { useEffect } from 'react';
import '../styles/RaidsHome.css';
import Layout from '../components/Layout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import img1 from '../webImages/raid f.jpg';
import img2 from '../webImages/raid s.jpg';
import raidh2 from '../webImages/raidh2.jpg';


const RaidsHome = () => {
  const cards = [
    {
      id: 1,
      title: 'Raid Submit Form',
      image: img1,
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
            <p><center>A Raid Management System is a software application designed to facilitate the 
              planning, execution, and documentation of raids conducted by law enforcement
               agencies, regulatory bodies, or other authorized entities. 
               This system serves as a comprehensive tool for managing various aspects 
              of raid operations, including pre-raid planning, resource allocation,
               real-time coordination, evidence collection, and post-raid reporting.

             At its core, a Raid Management System streamlines the entire raid process,
              from initial planning to the final disposition of seized assets or individuals.
              It enables agencies to create detailed raid plans, allocate resources efficiently,
              and ensure the safety of personnel involved. During the execution phase,
             the system provides real-time tracking and communication capabilities, 
            allowing commanders to monitor progress, adjust tactics as needed, and 
            maintain situational awareness.

            One of the key features of a Raid Management System is its ability to facilitate 
            evidence collection and documentation. 
            It allows officers to record and catalog evidence seamlessly, including photographs, 
            videos, witness statements, and other relevant information. This ensures that all
             evidence is properly documented, preserved, and admissible in legal proceedings.

           After the raid is completed,
           the system generates comprehensive reports detailing the 
           operation's objectives, outcomes, and any pertinent findings. 
           These reports serve as official records of the raid, providing valuable
            insights for analysis, accountability, and future planning. 
            Additionally, the system may support integration with other
             law enforcement databases or systems to streamline information sharing and collaboration.
            </center></p>
          </div>
          <img src={raidh2}/>
        </div>




      </div>
    </Layout>



  )
}
export default RaidsHome;