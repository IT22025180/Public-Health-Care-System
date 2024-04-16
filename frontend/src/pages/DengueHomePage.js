import React from 'react';
import '../styles/denguehomepage.css';
import Layout from '../components/Layout';

import denimg1 from '../webImages/dengueimg1.jpeg';
import denimg2 from '../webImages/dengueimg2.jpeg';
import denimg3 from '../webImages/dengueimg3.jpeg';
import denimg4 from '../webImages/dengueimg4.jpeg';
import denimg5 from '../webImages/dcamp2.jpg';
import denimg6 from '../webImages/dcamp6.jpg';
import { Link } from 'react-router-dom';


const DengueHomePage = () => {

    const handleClick = () => {
        
        alert('Add Campaigns clicked!');
    };

    return (
        <Layout>
            <div className="dencamphome">
            <div className="dcamhome">
                <h1>Together Against Dengue</h1>
                <h2>Let's raise awareness and take preventive measures</h2>
                <p><center>Dengue fever is a viral infection transmitted by mosquitoes, primarily the Aedes aegypti species.It is widespread<br></br>in tropical and subtropical regions around the world, particularly in urban areas.
                  Public awareness campaigns<br></br>aim to educate the public about the signs and symptoms of dengue fever, the importance of seeking medical care<br></br>promptly, and the role of individual and community action in preventing the spread of the disease.</center></p>
            </div>
            <img src={denimg5} alt="Description of the image" className="dcampimg1" />
        </div>
            <h6>Upcoming Events</h6>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="cards-wrapper">
                            <div className="card">
                                <img src={denimg1} className="card-img-top" alt="image1" />
                                <div className="card-body">
                                    <h5 className="card-title">Dengue Awareness Day</h5>
                                    <p className="card-text">Join us as we unite to combat dengue fever. On this special day, we aim to raise awareness about dengue prevention, symptoms, and treatment.</p>
                                    <a href="/DengCampTab" className="btn btn-primary">More details</a>
                                </div>
                            </div>
                            <div className="card d-none d-md-block">
                                <img src={denimg2} className="card-img-top" alt="image2" />
                                <div className="card-body">
                                    <h5 className="card-title">Take a Stand Against Dengue</h5>
                                    <p className="card-text">"Take a Stand Against Dengue" is a community-driven initiative aimed at combating the spread of dengue fever together for a healthier future.</p>
                                    <a href="/DengCampTab" className="btn btn-primary">More details</a>
                                </div>
                            </div>
                            <div className="card d-none d-md-block">
                                <img src={denimg3} className="card-img-top" alt="image3" />
                                <div className="card-body">
                                    <h5 className="card-title">Dengue Danger Detectives</h5>
                                    <p className="card-text">"Dengue Danger Detectives" educates children about the dangers of dengue fever and encourages them to take proactive steps to prevent its spread.</p>
                                    <a href="/DengCampTab" className="btn btn-primary">More details</a>
                                </div>
                            </div>
                            <div className="card d-none d-md-block">
                                <img src={denimg4} className="card-img-top" alt="image4" />
                                <div className="card-body">
                                    <h5 className="card-title">Dengue Awareness Drive in Villages</h5>
                                    <p className="card-text">Join us in our Dengue Awareness Drive in Villages program, aimed at safeguarding our community against the threat of dengue fever. </p>
                                    <a href="/DengCampTab" className="btn btn-primary">More details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="addcamphome">
                <img src={denimg6} className="addcaimg" alt="image6"/>
                
                <Link to="/denguecamp">
                
                <button  className="addcbutton" type='button'>Add Campaigns</button>
                </Link>
                
                <a href="/Denguemap" className="viewmap">Add Campaigns</a>
            </div>
        </Layout>
    );
};

export default DengueHomePage;