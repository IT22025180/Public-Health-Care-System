import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../styles/mainmidwife.css'
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import image1 from '../webImages/babyy1.png'
import image2 from '../webImages/babyy2.png'
import image3 from '../webImages/babyy3.png'
import midimg5 from '../webImages/midd.jpg';


const MainMidwife = () => {

  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: 'Baby Details',
      buttonText: 'Add',
      buttonLink: '/babyDetails',
      className: 'babydetails-card',
      image: image1,
      aosAnimation: 'fade-right'
    },

    {
      id: 2,
      title: 'Baby Vaccine',
      buttonText: 'Add',
      buttonLink: '/babyVaccination',
      className: 'babyvaccination-card',
      image: image2,
      aosAnimation: 'fade-up'

    },

    {
      id: 3,
      title: 'Thriposha Destribution',
      buttonText: 'Add',
      buttonLink: '/thriposha',
      className: 'thriposha-card',
      image: image3,
      aosAnimation: 'fade-left'

    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <div className="midwife_home-page" data-aos="fade-up">
        <h3 className='midwife_main_'></h3>

        <div className="midcamphome">
          <div className="Midamhome" data-aos="fade-up">
            <h1 data-aos="fade-up">Midwife Management</h1>
            <h2> "Empowering Care, Nurturing Lives: Midwife Management for Healthy Beginnings"</h2>
            <p><center>"Empowering Care, Nurturing Lives: Midwife Management for Healthy Beginnings" encapsulates the essence of a comprehensive midwife management system focused on providing compassionate and empowering care to expectant mothers and their families.<br></br>
              empowerment and nurturing. Through efficient and supportive management practices, midwives can empower expectant mothers to actively participate in their care decisions and childbirth experience.</center></p>

          </div>
          <img src={midimg5} alt="Description of the image" className="mainmidimg1" />
        </div>
        <div className="midwifecard-container">
          {cards.map((card) => (
            <div key={card.id} className="midwife_card" data-aos={card.aosAnimation}>
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