import React, { useEffect, useState } from 'react'
import '../styles/RaidSubForm.css'
import Header from '../components/Header';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';
import * as Yup from 'yup';

const RaidSubForm = ({ submitted, data }) => {
    const [location, setslocation] = useState('');
    const [Details, setsdetails] = useState('');
    const [specialnotes, setsspecialnotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const navtoTable = () => {
        navigate('/RaidSubTable');
    }

    const validateSchema = Yup.object().shape({
        
        location: Yup.string().required('Location is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters'),
        details: Yup.string().required('Details is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
        specialnotes: Yup.string().required('Specialnotes is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Description must contain only letters'),
       
      });


    const addRS = async () => {
        try {
            
            await validateSchema.validate(
                {
                 
                 location,
                 Details,
                 specialnotes,
                },
                { abortEarly: false }
              );

            const response = await Axios.post('http://localhost:4000/api/addRS', {
                location: location,
                details: Details,
                specialNotes: specialnotes,

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
    };

    return (
        <Layout>

            <div>
                <div className='bdtitle'>

                    <h3 className='he3'>Raid Submission</h3>
                    <form className='addRS'>
                        <div className='input'>
                            <label htmlFor='location'>Location</label>
                            <input onChange={e => setslocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location' />
                            {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>}
                        </div>

                        <div className='input'>
                            <label htmlFor='details'>Details</label>
                            <input onChange={e => setsdetails(e.target.value)} type='text' id='details' autoComplete='off' placeholder='Details' />
                            {errorMessage.Details && <div className="text-danger">{errorMessage.Details}</div>}
                        </div>

                        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes</label>
            <input onChange={e=>setsspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
            {errorMessage.specialnotes && <div className="text-danger">{errorMessage.specialnotes }</div>}
        </div>

        <button onClick={navtoTable} className='bsubmit' type='button'>View Raids</button>


                       
                            <button onClick={addRS} className='bdsave' type='submit'>Save</button>
                      
                    </form>

                </div>
            </div>
        </Layout>

    )
}

export default RaidSubForm
