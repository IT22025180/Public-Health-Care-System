import React from 'react';
import '../styles/denguehomepage.css';
import Layout from '../components/Layout';

import denimg1 from '../webImages/dengueimg1.jpeg';
import denimg2 from '../webImages/dengueimg2.jpeg';
import denimg3 from '../webImages/dengueimg3.jpeg';
import denimg4 from '../webImages/dengueimg4.jpeg';


const DengueHomePage = () => {
    return (
        <Layout>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="cards-wrapper">
                            <div className="card">
                                <img src={denimg1} className="card-img-top" alt="image1" />
                                <div className="card-body">
                                    <h5 className="card-title">Card title 1</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card d-none d-md-block">
                                <img src={denimg2} className="card-img-top" alt="image2" />
                                <div className="card-body">
                                    <h5 className="card-title">Card title 2</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card d-none d-md-block">
                                <img src={denimg3} className="card-img-top" alt="image3" />
                                <div className="card-body">
                                    <h5 className="card-title">Card title 3</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                            <div className="card d-none d-md-block">
                                <img src={denimg4} className="card-img-top" alt="image4" />
                                <div className="card-body">
                                    <h5 className="card-title">Card title 4</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
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
        </Layout>
    );
};

export default DengueHomePage;