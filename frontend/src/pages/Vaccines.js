import React from "react";
import Layout from '../components/Layout'
import '../styles/Vaccines.css'
import { useNavigate } from "react-router-dom";



import image1 from '../webImages/vac1.jpg'
import image2 from '../webImages/vac2.jpg'
import image3 from '../webImages/vac3.jpg'

const Vaccines = () => {
    
    
    const navigate = useNavigate();
    
    const cards = [
      {
        id: 1,
        title: 'Vaccine Registration',
        buttonText: 'Add',
        buttonLink: '/VaccineReg',
        className: 'dengue-card',
        image: image1
      },
  
      {
        id: 2,
        title: 'Vaccine Appointments',
        buttonText: 'Add',
        buttonLink: '/Vaccineschedules',
        className: 'vaccine-card',
        image:image2
        
        
        
      },
  
      {
        id: 3,
        title: 'Vaccine Requests',
        buttonText: 'Request',
        buttonLink: '/Raidsschedules',
        className: 'raids-card',
        image: image3
        
      },
    ];


    return(
      
        <Layout>
                <div className="home-page">
        <h3>Vaccination Management</h3>
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

    </div>
        </Layout>  



    )
}
export default Vaccines;


