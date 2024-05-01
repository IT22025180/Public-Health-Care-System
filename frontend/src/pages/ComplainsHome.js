import React from 'react';
import '../styles/ComplainsHome.css';
import Layout from '../components/Layout';

import img1 from '../webImages/Reportimg.jpg';
import img2 from '../webImages/documentImg.jpg';

const ComplainsHome = () => {
  const cards = [
    {
      id: 1,
      title: 'Complains Form',
      image: img1,
      buttonText: 'View',
      buttonLink: '/Complains'
    }, 
    {
      id: 2,
      title: 'Complains report',
      image: img2,
      buttonText: 'View',
      buttonLink: '/Complainstable'
    }
  ];

  return (
      <Layout>  
            <div className="Chome-page">
              <h1><b>Complains Management</b></h1>
              <div className="Chome">
                <h3><b>Welcome to the Complaints Management section of our Public Health Information System.</b></h3><br></br>
                <p><center><i>Easily submit food and dengue complaints. Our team acts swiftly to address concerns. Your voice matters for a healthier community. Whether it's about food safety or dengue prevention, we're here to listen. With our streamlined process, expect efficient resolution and ongoing support. Together, let's build a safer and healthier environment for all.<br></br>
                    
                </i></center></p>
            </div>
              <div className="Ccard-container">
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
        </Layout>  



    )
}
export default ComplainsHome;