import React from 'react';
import '../styles/FineAndCourt.css';
import Layout from '../components/Layout';

const FineAndCourt = () => {
  const cards = [
    {
      id: 1,
      title: 'Report Submit',
      description: 'Efficiently report violations with our user-friendly submission system. Raid officers can easily submit detailed reports, including evidence, to ensure swift action and enforcement of regulations.',
      image: 'report.png',
      buttonText: 'Submit Report',
      buttonLink: '/Fine-And-court-Submit-Reports'
    },
    {
      id: 2,
      title: 'Analyse Reports',
      description: 'Our fine and court team meticulously analyses each report to determine appropriate actions. Leveraging advanced decision-making algorithms and comprehensive data analysis, we ensure fair and just outcomes for every violation.',
      image: 'analyse.png',
      buttonText: 'Analyse Now',
      buttonLink: '/analyse'
    },
    {
      id: 3,
      title: 'Manage Documents',
      description: 'Streamline documentation with our robust management system. All case documents are securely stored, categorized, and easily accessible, enabling efficient collaboration and ensuring compliance with documentation requirements.',
      image: 'document.png',
      buttonText: 'Manage Documents',
      buttonLink: '/Fine-And-court-Document-Management'
    }
  ];

  return (
      <Layout>
            <div className="home-page">
              <h1>Fine and Court</h1>
              <div className="card-container">
                {cards.map((card) => (
                  <div key={card.id} className="card">
                    <img src={card.image} alt={card.title} className="card-image" />
                    <div className="card-body">
                      <h2 className="card-title">{card.title}</h2>
                      <p className="card-text">{card.description}</p>
                      <a href={card.buttonLink} className="btn btn-primary">
                        {card.buttonText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      </Layout>
  );
};

export default FineAndCourt;