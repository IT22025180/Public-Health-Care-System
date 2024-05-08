import React, { useEffect } from 'react';
import '../styles/ComplainsHome.css';
import Layout from '../components/Layout';

import img1 from '../webImages/Reportimg.jpg';
import img2 from '../webImages/documentImg.jpg';

import Aos from 'aos';
import 'aos/dist/aos.css'; //anim

const ComplainsHome = () => {
  const cards = [
    {
      id: 1,
      title: 'Complains Form',
      image: img1,
      buttonText: 'View',
      buttonLink: '/Complains',
      aosAnimation: 'fade-right'
    }, 
    {
      id: 2,
      title: 'Complains report',
      image: img2,
      buttonText: 'View',
      buttonLink: '/Complainstable',
      aosAnimation: 'fade-left'
    }
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with your desired options //anim
  }, []);

  return (
      <Layout>  

<div data-aos="fade-up" //anim
        data-aos-anchor-placement="center-bottom">

            <div className="Cchome-page">
              <h1><b>Complains Management</b></h1>
              <div className="Cchome">
                <h3><b>Welcome to the Complaints Management section of our Public Health Information System.</b></h3><br></br>
                <p><center><i>Easily submit food and dengue complaints. Our team acts swiftly to address concerns. Your voice matters for a healthier community. Whether it's about food safety or dengue prevention, we're here to listen. With our streamlined process, expect efficient resolution and ongoing support. Together, let's build a safer and healthier environment for all.<br></br>
                    
                </i></center></p>
            </div>
              <div className="Cccard-container">
                {cards.map((card) => (
                  <div key={card.id} className="Cccard" data-aos={card.aosAnimation}>
                    <img src={card.image} alt={card.title} className="Cccard-image" />
                    <div className="Cccard-body">
                      <h2 className="Cccard-title">{card.title}</h2>
                      <p className="Cccard-text">{card.description}</p>
                      <a href={card.buttonLink} className="btn btn-primary">
                        {card.buttonText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
          
          


    </div>
    </div>
        </Layout>  



    )
}
export default ComplainsHome;