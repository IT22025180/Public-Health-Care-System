import React, { useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RaidSubForm = () => {
    const [location, setLocation] = useState('');
    const [details, setDetails] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        location: Yup.string().required('Location is required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters'),
        details: Yup.string().required('Details is required').matches(/^[A-Za-z\s]+$/, 'Details must contain only letters'),
        specialNotes: Yup.string().required('Special Notes is required').matches(/^[A-Za-z\s,.0-9]+$/, 'Special Notes must contain only letters'),
    });

    const addRS = async () => {
        try {
            await validateSchema.validate({ location, details, specialNotes }, { abortEarly: false });

            const response = await Axios.post('http://localhost:4000/api/addRS', {
                location,
                details,
                specialNotes,
            });

            console.log('Successfully added:', response.data);
            setLocation('');
            setDetails('');
            setSpecialNotes('');

            // Show success message with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data added successfully!',
            }).then(() => {
                // Navigate after clicking OK
                navigate('/raidsubtable');
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });
                setErrorMessage(errors);
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Layout>
            <div className='bdtitle'>
                <h3 className='he3'>Raid Submission</h3>
                <form className='addRS'>
                    <div className='input'>
                        <label htmlFor='location'>Location</label>
                        <input value={location} onChange={e => setLocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location' />
                        {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>}
                    </div>

                    <div className='input'>
                        <label htmlFor='details'>Details</label>
                        <input value={details} onChange={e => setDetails(e.target.value)} type='text' id='details' autoComplete='off' placeholder='Details' />
                        {errorMessage.details && <div className="text-danger">{errorMessage.details}</div>}
                    </div>

                    <div className='input'>
                        <label htmlFor='specialNotes'>Special Notes</label>
                        <input value={specialNotes} onChange={e => setSpecialNotes(e.target.value)} type='text' id='specialNotes' autoComplete='off' placeholder='Special Notes' />
                        {errorMessage.specialNotes && <div className="text-danger">{errorMessage.specialNotes}</div>}
                    </div>
                    <Link to='/raidsubtable'>
                        <button className='bsubmit' type='button'>View Raids</button>
                    </Link>
                    <button onClick={addRS} className='bdsave' type='button'>Save</button>
                </form>
            </div>
        </Layout>
    );
};

export default RaidSubForm;
