import React from 'react';
import '../styles/FineAndCourt.css';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

import img1 from '../webImages/Reportimg.jpg';
import img2 from '../webImages/AnalyseImg.png';
import img3 from '../webImages/documentImg.jpg';

const FineAndCourt = () => {
  const cards = [
    {
      id: 1,
      title: 'Report Submit',
      description: 'Efficiently report violations with our user-friendly submission system. Raid officers can easily submit detailed reports, including evidence, to ensure swift action and enforcement of regulations.',
      image: img1,
      buttonText: 'Submit Report',
      buttonLink: '/Fine-And-court-Submit-Reports'
    }, 
    {
      id: 2,
      title: 'Analyse Reports',
      description: 'Our fine and court team analyses each report to determine appropriate actions. Leveraging advanced decision-making algorithms and comprehensive data analysis, we ensure fair and just outcomes for every violation.',
      image: img2,
      buttonText: 'Analyse Now',
      buttonLink: '/Fine-And-court-Analyse'
    },
    {
      id: 3,
      title: 'Manage Documents',
      description: 'Manage documentation with our robust management system. All case documents are securely stored, categorized, and easily accessible and ensuring compliance with documentation requirements.',
      image: img3,
      buttonText: 'Manage Documents',
      buttonLink: '/Fine-And-court-Document-Management'
    }
  ];

  return (
      <Layout>  
            <div className="home-page">
              <h1>Fine and Court</h1>
              <div className="fccard-container">
                {cards.map((card) => (
                  <div key={card.id} className="fccard">
                    <img src={card.image} alt={card.title} className="fccard-image" />
                    <div className="fccard-body">
                      <h2 className="fccard-title">{card.title}</h2>
                      <p className="fccard-text">{card.description}</p>
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