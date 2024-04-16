import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { FaUser } from 'react-icons/fa'
import { Button, Form, Alert } from 'react-bootstrap'
import '../styles/addClinics.css'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import teeth from '../webImages/teeth.jpg'
import dengue from '../webImages/dengueM.jpg'
import * as Yup from 'yup';

const AddClinic = () => {

    const navigate = useNavigate();

    const [ctype, setCtype] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [venue, setVenue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    

    const validateSchema = Yup.object().shape({
        ctype: Yup.string().required('Clinic type is required').oneOf(['Dengue', 'Dental'], 'Invalid Clinic Type'),
        date: Yup.string().required('Date is Required'),
        time: Yup.string().required('Time is required'),
        venue: Yup.string().required('Venue is required')
    })



    const addClnics = async () => {
        try {
            await validateSchema.validate(
                {
                    ctype,
                    date,
                    time,
                    venue,
                },
                { abortEarly: false }
            );

            const response = await Axios.post('http://localhost:4000/api/addClinic', {

                ctype: ctype,
                date: date,
                time: time,
                venue: venue,
            });

            console.log("Clinic adding is successful", response.data);
            Swal.fire({
                title: "Success!",
                text: "CLinic was added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
            setCtype('');
            setDate('');
            setTime('');
            setVenue('');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });
                setErrorMessage(errors);
            } else {
                console.error('Error', error);
            }
        }
    }

    const navtoClinics = async () => {
        navigate('/adminClinics');
    }

    const navtoGenrep = async () => {
        navigate('/genPatientReport')
    }

    return (
        <div className='contflex'>
            <hr className='hline' />
            <div className='clcontainer'>
                <div className='cl1'>
                    <FaUser />
                    <p>Dr. kk</p>
                </div>
                <div className='frm'>
                    <h2>Add a Clinic appointment </h2>
                    <br />
                    <div className='rdgrp'>
                        <div className='rdbtn'>
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                value='Dengue'
                                checked={ctype === 'Dengue'}
                                onChange={e => setCtype(e.target.value)} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Dengue
                            </label>
                        </div>
                        <div className='rdbtn'>
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                value='Dental'
                                checked={ctype === 'Dental'}
                                onChange={e => setCtype(e.target.value)} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Dental
                            </label>
                        </div>
                    </div>
                    {errorMessage.ctype && <div className="d-flex justify-content-center text-danger">{errorMessage.ctype}</div>}
                    <br />
                    <div className='slcbtn'>
                        <p>Select date :</p>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type='date'
                                    value={date}
                                    onChange={e => setDate(e.target.value.toString())} />
                            </Form.Group>
                        </Form>

                    </div>
                    {errorMessage.date && <div className="d-flex justify-content-center text-danger">{errorMessage.date}</div>}
                    <br />
                    <div className='slcbtn'>
                        <p>Select time : </p>

                        <Form.Group>
                            <Form.Control as='select' size='sm' onChange={e => setTime(e.target.value)}>
                                <option >Select time</option>
                                <option >07 : 00</option>
                                <option >07 : 30</option>
                                <option >08 : 00</option>
                                <option >08 : 30</option>
                                <option >09 : 00</option>
                                <option >09 : 30</option>
                                <option >10 : 00</option>
                                <option >10 : 30</option>
                                <option >11 : 00</option>
                                <option >11 : 30</option>
                                <option >12 : 00</option>
                                <option >12 : 30</option>
                                <option >13 : 00</option>
                                <option >13 : 30</option>
                                <option >14 : 00</option>
                                <option >14 : 30</option>
                                <option >15 : 00</option>
                                <option >15 : 30</option>
                                <option >16 : 00</option>
                                <option >16 : 30</option>
                                <option >17 : 00</option>
                                <option >17 : 30</option>
                                <option >18 : 00</option>
                                <option >18 : 30</option>
                                <option >19 : 00</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    {errorMessage.time && <div className="d-flex justify-content-center text-danger">{errorMessage.time}</div>}
                    <br />
                    <div className='slcbtn'>
                        <p>Venue:</p>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type='text'
                                    value={venue}
                                    onChange={e => setVenue(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    {errorMessage.venue && <div className="d-flex justify-content-center text-danger">{errorMessage.venue}</div>}
                    <br />
                    <Button onClick={addClnics}>Submit</Button>
                    <br />
                    <hr />
                    <br />
                    <Button onClick={navtoClinics}>View clinics</Button>
                    <Button className='btn' onClick={navtoGenrep}>Generate report</Button>
                </div>
            </div>
        </div>
    )
}

export default AddClinic;


/**<div class='containC'>
                <div class='slider-frameC'>
                    <div class='slider-imgC'>
                        <div class='img-containerC'>
                            <img src={teeth} alt='clinic' width={500} height={500} />
                        </div>

                    </div>
                </div>
            </div> */