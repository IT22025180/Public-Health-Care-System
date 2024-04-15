import React, { useEffect, useState } from 'react'
import '../styles/RaidSubForm.css'
import Header from '../components/Header';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';


const RaidSubForm = ({ submitted, data }) => {
    const [location, setslocation] = useState('');
    const [Details, setsdetails] = useState('');
    const [specialnotes, setsspecialnotes] = useState('');


    useEffect(() => {
        if (!submitted) {
            setslocation('');
            setsdetails('');
            setsspecialnotes('');


        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setslocation(data.location);
            setsdetails(data.details);
            setsspecialnotes(data.sNote);

        }
    }, [data]);


    const addRS = async () => {
        try {
            const response = await Axios.post('http://localhost:4000/api/addRS', {
                location: location,
                details: Details,
                sNote: specialnotes,

            });

            console.log('Successfully', response.data);
        } catch (error) {
            console.error('error', error);
        }

    }


    return (
        <Layout>

            <div>
                <div className='bdtitle'>

                    <h3 className='he3'>Raid Submission</h3>
                    <form className='addRS'>
                        <div className='input'>
                            <label htmlFor='location'>Location</label>
                            <input onChange={e => setslocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location' />
                        </div>

                        <div className='input'>
                            <label htmlFor='details'>Details</label>
                            <input onChange={e => setsdetails(e.target.value)} type='text' id='details' autoComplete='off' placeholder='Details' />
                        </div>

                        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes</label>
            <input onChange={e=>setsspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
        </div>

                        <button className='bdsubmit' type='submit'>Cancel</button>


                        <Link to="/RaidSubTable">
                            <button onClick={addRS} className='bdsave' type='submit'>Save</button>
                        </Link>

                    </form>

                </div>
            </div>
        </Layout>

    )
}

export default RaidSubForm
