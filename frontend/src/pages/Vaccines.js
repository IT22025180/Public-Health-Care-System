import React, { useEffect } from "react";
import Layout from '../components/Layout'
import '../styles/Vaccines.css'
import { useNavigate } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';
import image1 from '../webImages/vac1.jpg'
import image2 from '../webImages/vac2.jpg'
import image3 from '../webImages/vac3.jpg'
import vaccmain from '../webImages/vaccmain.png';
import vac6 from '../webImages/vac6.jpg';


const Vaccines = () => {


  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: 'Vaccine Registration',
      buttonText: 'Add',
      buttonLink: '/VaccineReg',
      className: 'reg-card',
      image: image1,
      aosAnimation: 'fade-right'
    },

    {
      id: 2,
      title: 'Vaccine Appointments',
      buttonText: 'Add',
      buttonLink: '/VaccineApp',
      className: 'app-card',
      image: image2,
      aosAnimation: 'fade-up'
    },

    {
      id: 3,
      title: 'Vaccine Requests',
      buttonText: 'Request',
      buttonLink: '/VaccineRequest',
      className: 'req-card',
      image: image3,
      aosAnimation: 'fade-left'
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (

    <Layout>
      <div className="vaccine-page">
        <h2>Vaccine Information</h2>
        <div className="Card-container">
          {cards.map((card) => (
            <div key={card.id} className="Card" data-aos={card.aosAnimation}>
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

        <div className="vachome" data-aos="fade-up">
          <div className="vhome">
            <h2 data-aos="fade-up">Vaccination Details </h2>
            <h3>Check all the vaccination data and distributions</h3>
            <p data-aos="fade-up"><center>Vaccination distribution and management encompass a complex framework of planning,
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


        <div className="vachome" data-aos="fade-up">
        <img src={vac6} alt="Description of the image" className="vaccmain" />
          <div className="vhome">
            <h2 data-aos="fade-up">Vaccination Requests </h2>
            <h3>Check all the vaccination requests and Information</h3>
            <p data-aos="fade-up"><center>VMedical health professionals play a pivotal role in vaccine administration,
            starting with the assessment of individuals' eligibility based on various factors.<br></br>
              TThey educate individuals about the vaccine, address concerns, and obtain informed consent before administering it. 
              Precise documentation of vaccine details is maintained for monitoring purposes. <br></br>
              <button onClick={() => navigate('/VaccineRequestTab')} className="view-detail-btn">View requested vaccines</button>

            </center></p>
          </div>
          
        </div>




      </div>
    </Layout>



  )
}
export default Vaccines;


