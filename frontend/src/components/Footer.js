import React from 'react'
import './Footer.css';
import { FaBlenderPhone, FaEnvelope, FaFacebook, FaLocationArrow, FaMailBulk, FaMailchimp, FaMap, FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapMarkerAlt, FaMapPin, FaPhone, FaPhoneAlt, FaPhoneSquare, FaSearchLocation, FaTwitter, FaVoicemail, FaYoutube } from 'react-icons/fa'
import natlogo from '../webImages/natLogo.png';
import fimg from '../webImages/footerimg.jpg';


const Footer = () => {
    return (
        <div className="footer">
            <div className="container_f">
              <div className='foothead'>
                <img src={natlogo} width={85} height={100}/>
                <h2>Ministry of Health</h2>
              </div>
                <div className="row_f">
                    <div className="footer-col">
                        <h4>Contact Information</h4>
                        
                        <ul> 
                           <FaMapMarkerAlt/>
                            <li><a href='https://maps.app.goo.gl/E3hwTditMfC7xo2v9'>Suwasiripaya, No. 385,
                            Rev. Baddegama Wimalawansa Thero 
                            Mawatha,
                            Colombo 10, Sri Lanka.</a></li>

                            <FaPhone/>                  
                            <li><a href="tel: 0112694033">112 694033</a></li>
                            <li><a href="tel: 0112675011">112 675011</a></li>
                            <li><a href="tel: 0112675449">112 675449</a></li>
                            <li><a href="tel: 0112693493">112 693493</a></li>

                            <FaEnvelope/>
                            <li>abcd@gov.lk</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Quick links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/staff">Staff</a></li>
                            <li><a href="/vaccine">Vaccine</a></li>
                            <li><a href="clinics">Clinic</a></li>
                            <li><a href="/complain">Complains</a></li>
                            <li><a href="/dengue">Dengue</a></li>
                            <li><a href="/raids">Raids</a></li>
                            <li><a href="/midwife">Midwife</a></li>
                            <li><a href="/Fine-And-court">Fine & Court</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="https://www.facebook.com" target='_blank' className='blue'><FaFacebook/></a>
                            <a href="https://www.twitter.com" target='_blank' className='blue'><FaTwitter/></a>
                            <a href="https://www.youtube.com" target='_blank' className='red'><FaYoutube/></a>
                            <br/>
                            <img src={fimg}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <p>© Copyright 2024 Public Health Information System</p>
            </div>
        </div>

  )
}

export default Footer
