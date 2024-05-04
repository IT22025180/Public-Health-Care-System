import React from 'react';
import '../styles/FineAndCourt.css';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

import img1 from '../webImages/Reportimg.jpg';
import img2 from '../webImages/AnalyseImg.png';
import img3 from '../webImages/documentImg.jpg';
import fnc from '../webImages/fnc.jpeg';

const FineAndCourt = () => {
  const cards = [
    {
      id: 1,
      title: 'Report Submit',
      image: img1,
      buttonText: 'Submit Report',
      buttonLink: '/Fine-And-court-Submit-Reports'
    },
    {
      id: 2,
      title: 'Analyse Reports',
      image: img2,
      buttonText: 'Analyse Now',
      buttonLink: '/Fine-And-court-Analyse'
    },
    {
      id: 3,
      title: 'Manage Documents',
      image: img3,
      buttonText: 'Manage Documents',
      buttonLink: '/Fine-And-court-Document-Management'
    }
  ];

  return (
    <Layout>
      <div className="FCdis">
        <div className="FCabt">
        <h1>Welcome to the Fine and Court system</h1>
          <p><center>We are committed to maintaining a fair and just community. Our platform provides a streamlined process for reporting and analyzing violations of terms and conditions, ensuring that all parties involved can quickly and efficiently address any issues that arise.</center></p>
          <p><center>Our reporting feature allows authorized Raid Officers to submit violation reports, providing crucial information needed to take action. The Analyze Reports feature then enables fine and court officers to review and analyze these reports, identifying trends and patterns to inform decision-making.</center></p>
          <p><center>In addition, our Manage Documents feature allows for easy organization and management of case-related documents, ensuring that all necessary information is readily available to all parties involved.</center></p>
          <p><center>At Fine and Court, we believe that a transparent and accountable process is essential to maintaining a safe and thriving community. We are proud to provide a platform that supports this mission.</center></p>
        </div>
        <img src={fnc} alt="Description of the image" className="fcimg" />
      </div>
      <div className="home-page">
        <h2>Features</h2>
        <div className="fccard-container">
          {cards.map((card) => (
            <div key={card.id} className="fccard">
              <img src={card.image} alt={card.title} className="fccard-image" />
              <div className="fccard-body">
                <h2 className="fccard-title">{card.title}</h2>
                <a href={card.buttonLink} className="btn btn-primary">
                  {card.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='tabBtn'>
        <Link to='/F&CReportViolationTabe'><button>Report Table</button></Link>
        <Link to='/FCRS'><button>Report Status</button></Link>
        <Link to='/F&CDocumentManagementTabe'><button>Documents Table</button></Link>
      </div>
    </Layout>
  );
};

export default FineAndCourt;