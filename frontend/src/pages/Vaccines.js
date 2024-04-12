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
        className: 'reg-card',
        image: image1
      },
  
      {
        id: 2,
        title: 'Vaccine Appointments',
        buttonText: 'Add',
        buttonLink: '/VaccineApp',
        className: 'app-card',
        image:image2
        
        
        
      },
  
      {
        id: 3,
        title: 'Vaccine Requests',
        buttonText: 'Request',
        buttonLink: '/VaccineRequest',
        className: 'req-card',
        image: image3
        
      },
    ];


    return(
      
        <Layout>
                <div className="vaccine-page">
        <h2>Vaccination Management</h2>
        <div className="Card-container">
          {cards.map((card) => (
            <div key={card.id} className="Card">
              <img src={card.image} alt={card.title} className="Card-image" />
              <div className="Card-body">
                <h2 className="Card-title">{card.title}</h2>
                <p className="Card-text">{card.description}</p>
                <a href={card.buttonLink} className="Btnview">
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


