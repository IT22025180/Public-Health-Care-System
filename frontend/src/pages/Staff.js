import { React, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import '../styles/Staff.css';
import image1 from '../webImages/den.png';
import image2 from '../webImages/va2.png';
import image3 from '../webImages/raids.png';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';


const Staff = () => {

  const navigate = useNavigate();
  const Leave = () => {
    navigate('/Leave')
  }

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const cards = [
    {
      id: 1,
      title: 'Dengue Schedules',
      buttonText: 'View',
      buttonLink: '/DengueAssignTable',
      className: 'dengue-card',
      image: image1,
      aosAnimation: 'fade-right'

    },
    {
      id: 2,
      title: 'Vaccine Schedules',
      buttonText: 'View',
      buttonLink: '/Vaccineschedules',
      className: 'vaccine-card',
      image: image2,
      aosAnimation: 'fade-up'
    },
    {
      id: 3,
      title: 'Raids Schedules',
      buttonText: 'View',
      buttonLink: '/Raidsschedules',
      className: 'raids-card',
      image: image3,
      aosAnimation: 'fade-left'
    },
  ];

  return (
    <div>
      <Layout>
        <div className="home-page">
          <h1>Staff Schedules</h1>


          <hr className="horizontal-line" data-aos="fade-up" />
          <div className="slider-container" data-aos="fade-up" >
            <div className="page-container_a">
              <div className='staff1'>
                <h2 className="stvac">Vaccination Schedules</h2>
                <p>
                  <p className="stvac1" > Dear Team,</p>
                  <p className="stvac1">
                    We are pleased to announce the release of our vaccination schedules for the upcoming period.
                    These schedules detail essential vaccination campaigns, clinics, outreach programs, and training sessions.
                    Ensuring adherence to these schedules is crucial to maintaining high vaccination coverage and safeguarding public health.
                    We appreciate your dedication to this important endeavor.
                    Thank you for your continued commitment.
                  </p>
                  <p className="stvac1">Best regards,</p>
                  <p className="stvac1">Yethmi Liyanaarachchi</p>
                </p>
              </div>
            </div>
            <div className="page-container_b" data-aos="fade-up">

              <div className='staff1'>
                <h2 className="stvac"> Leave Policy Update</h2>
                <p>
                  <p className="stvac1" > Dear Team,</p>
                  <p className="stvac1" >We're updating our leave policy to better support your needs. Effective immediately:</p>
                  <p className="stvac1">
                    <p>1.Annual Leave: Enjoy your well-deserved time off with our annual leave allowance.</p>

                    <p>2.Sick Leave: Take care of yourself with sick leave when you're unwell.</p>

                    <p> 3.Family & Medical Leave: Support your loved ones or address personal medical needs with family and medical leave.</p>

                    <p>4.Emergency Leave: For unforeseen emergencies, we're here to provide support with emergency leave.</p>
                  </p>
                  <p className="stvac1">Best regards,</p>
                  <p className="stvac1">Yethmi Liyanaarachchi</p>
                </p>
              </div>
            </div>
            <div className="page-container_c" data-aos="fade-up">


              <div className='staff1'>
                <h2 className="stvac"> Upcoming Events: Stay Informed!</h2>
                <p>
                  <p className="stvac1" > Dear Team,</p>
                  <p className="stvac1" >Exciting events are on the horizon in our health sector! Stay tuned for:</p>
                  <p className="stvac1">
                    <p>1.Health Workshops: Enhance your skills and knowledge with informative workshops covering various health topics.</p>

                    <p>2.Community Health Camps: Join us in serving our community through health camps providing essential medical services.</p>

                    <p> 3.Awareness Campaigns: Participate in spreading awareness about important health issues through engaging campaigns.</p>

                    <p>4.Training Sessions: Sharpen your expertise with specialized training sessions tailored to your professional development.</p>
                  </p>
                  <p className="stvac1">Best regards,</p>
                  <p className="stvac1">Yethmi Liyanaarachchi</p>
                </p>
              </div>
            </div>
          </div>

          <div className="Scard-container">
            {cards.map((card) => (
              <div key={card.id} className="Scard" data-aos={card.aosAnimation}>
                <img src={card.image} alt={card.title} className="Scard-image" />
                <div className="Scard-body">
                  <h2 className="Scard-title">{card.title}</h2>
                  <p className="Scard-text">{card.description}</p>
                  <a href={card.buttonLink} className="btnview">{card.buttonText}</a>
                </div>
              </div>
            ))}
          </div>

          <div className="apply-leave-box" data-aos="fade-up">
            <h3 className='applyleave'>Please fill this form to apply for your leave.</h3>
            <button onClick={Leave} data-aos="fade-up">Click here</button>
            <a href="/LeaveTable" className="btn-leave-history" data-aos="fade-up">See Leave History</a>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Staff;
