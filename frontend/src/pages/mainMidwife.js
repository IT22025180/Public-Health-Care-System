import React from 'react'
import { Link } from 'react-router-dom'; 
import '../styles/mainmidwife.css'
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

import image1 from '../webImages/babyy1.png'
import image2 from '../webImages/babyy2.png'
import image3 from '../webImages/babyy3.png'


const MainMidwife = () => {

  const navigate = useNavigate();
    
  const cards = [
    {
      id: 1,
      title: 'Baby Details',
      buttonText: 'Add',
      buttonLink: '/babyDetails',
      className: 'babydetails-card',
      image:image1
    },

    {
      id: 2,
      title: 'Baby Vaccine',
      buttonText: 'Add',
      buttonLink: '/babyVaccination',
      className: 'babyvaccination-card',
      image:image2

      
      
    },

    {
      id: 3,
      title: 'Thriposha Destribution',
      buttonText: 'Add',
      buttonLink: '/thriposha',
      className: 'thriposha-card',
      image:image3

      
    },
  ];

  return (
    <Layout>
    <div className="midwife_home-page">
    <h3 className='midwife_main_'>Midwife Management</h3>
    <div className="midwifecard-container">
    {cards.map((card) => (
    <div key={card.id} className="midwife_card">
    <img src={card.image} alt={card.title} className="midwife_card-image" />
    <div className="midwife_card-body">
    <h2 className="midwife_card-title">{card.title}</h2>
    
    <a href={card.buttonLink} className="midwife_btnview">
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

export default MainMidwife