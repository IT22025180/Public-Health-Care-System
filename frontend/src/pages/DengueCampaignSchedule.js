import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import '../styles/denguecampaignschedule.css'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const DengueCampaigns = ({ submitted, data }) => {
    const [venue, setvenue] = useState('');
    const [date, setdate] = useState('');
    const [time, settime] = useState('');
    const [drName, setdrName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateSchema = Yup.object().shape({
        venue: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
        date: Yup.string().required('Date is Required'),
        time: Yup.string().required('Time is Required'),
        drName: Yup.string().required('Name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
      });

    const addcamp = async () => {
        try {

            await validateSchema.validate(
                {
                venue,
                date,
                time,
                drName, 
                },
                { abortEarly: false }
              );

            const response = await Axios.post('http://localhost:4000/api/addCamp', {
                venue: venue,
                date: date,
                time: time,
                drName: drName,
            });

            console.log('Successfully', response.data);
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
    return (
        <Layout>
            <div className='title2'>
                <h3 className='h23'>Campaign Details</h3>
                <form className='campaigndetails'>
                    <div className="input">
                        <label className='venue' htmlFor="venue">Venue</label>
                        <input onChange={e => setvenue(e.target.value)} type="text" id="venue" name="venue" autoComplete='off' placeholder='Venue' />
                    </div>
                    {errorMessage.venue && <div className="text-danger">{errorMessage.venue}</div>}
                    <div className="input">
                        <label htmlFor="date">Date</label>
                        <input onChange={e => setdate(e.target.value.toString())} type="date" id="date" name="date" autoComplete='off' placeholder='Date' />
                    </div>
                    {errorMessage.date && date === '' && <div className="text-danger">Invalid Date</div>}
                    <div className="input">
                        <label className='stime' htmlFor="stime">Starting Time</label>
                        <input onChange={e => settime(e.target.value)} type="time" id="stime" name="stime" autoComplete='off' placeholder='Starting Time' />
                    </div>
                    {errorMessage.time && <div className="text-danger">{errorMessage.time}</div>}
                    <div className="input">
                        <label className='stime' htmlFor="etime">End Time</label>
                        <input onChange={e => settime(e.target.value)} type="time" id="etime" name="etime" autoComplete='off' placeholder='End Time' />
                    </div>
                    {errorMessage.etime && <div className="text-danger">{errorMessage.etime}</div>}
                    <div className="input">
                        <label className='drname' htmlFor="conductedby">Conducted by</label>
                        <input onChange={e => setdrName(e.target.value)} type="conductedby" id="conductedby" name="conductedby" autoComplete='off' placeholder='Conductedby' />
                    </div>
                    {errorMessage.drName && <div className="text-danger">{errorMessage.drName}</div>}
                    <div className="input">

                    
                        <button onClick={addcamp} type='submit' value="Submit">Save</button>

                        <Link to="/DengCampTab">
                        <button type='submit' value="Cancel">View Campaign details</button>
                        </Link>
    
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default DengueCampaigns;