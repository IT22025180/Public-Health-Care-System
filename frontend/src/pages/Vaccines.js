import React from "react";
import Layout from '../components/Layout'
import '../styles/Vaccines.css'
import { useNavigate } from "react-router-dom";



import image1 from '../webImages/vac1.jpg'
import image2 from '../webImages/vac2.jpg'
import image3 from '../webImages/vac3.jpg'
import vaccmain from '../webImages/vaccmain.png';

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

        <div className="vachome">
            <div className="vhome">
                <h2>Vaccination Details </h2>
                <h3>Check all the vaccination data and distributions</h3>
                <p><center>Vaccination distribution and management encompass a complex framework of planning, 
                  coordination, and execution to ensure the effective delivery of vaccines to target populations.<br></br>
                   This involves meticulous supply chain management to maintain vaccine integrity,
                    allocation strategies to prioritize high-risk groups, and the establishment of distribution networks spanning diverse healthcare settings.<br></br>
                     Additionally, robust monitoring, surveillance, and community engagement efforts are essential to track vaccine uptake,
                      address concerns, and adapt strategies as needed, ultimately fostering widespread vaccine acceptance and protecting public health.<br></br>
                      <button onClick={() => navigate('/VaccineRegTab')} className="view-details-btn">View Details</button>

</center></p>
            </div>
            <img src={vaccmain} alt="Description of the image" className="vaccmain" />
        </div>
          
          


    </div>
        </Layout>  



    )
}
export default Vaccines;


