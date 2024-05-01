import React, { useEffect, useState } from 'react'
import '../styles/RaidForm.css'
import { Link, useHistory, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios  from 'axios';
import * as Yup from 'yup';

const RaidForm= ({submitted,data}) => {
    const [location,setflocation]=useState('');
    const [date,setfdate]=useState('');
    const[time,setftime]=useState('');
    const[officer,setfofficer]=useState('');
    const[specialnotes,setfspecialnotes]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const navtoTable = () => {
        navigate('/RaidFormTable');
    }
    const validateSchema = Yup.object().shape({
        
        location: Yup.string().required('Location is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters'),
        date: Yup.string().required('Date is Required'),
        time:Yup.string().required('Time is Required'),
        officer: Yup.string().required('Officer is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Name must contain only letters'),
        specialnotes: Yup.string().required('Specialnotes is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Description must contain only letters'),
       
      });

       
    const addRF =async()=>{
             


        try{

            await validateSchema.validate(
                {
                 
                  location,
                  date,
                  time,
                  officer,
                  specialnotes  ,
                },
                { abortEarly: false }
              );

        const response =await Axios.post('http://localhost:4000/api/addRF',{
            location :location,
            date : date,
            time:time,
            officer:officer,
            sNote:specialnotes,
        });

        console.log('Successfully',response.data);
    }catch (error) {
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

    <h3 className='he3'>Raid Form</h3>
    
    <form className='addRF'>
        <div className='input'>
            <label htmlFor='location'>Location</label>
            <input onChange={e=>setflocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location'/>
            {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>}
        </div>

        <div className='input'>
            <label htmlFor='date'>Date</label>
            <input onChange={e=>setfdate(e.target.value.toString())} type='datetime-local' id='date' autoComplete='off' placeholder='Date'/>
            {errorMessage. date === <div className="text-danger">{errorMessage. date}</div>}
        </div>

        <div className='input'>
            <label htmlFor='time'>Time</label>
            <input onChange={e=>setftime(e.target.value)} type='text' id='time' autoComplete='off' placeholder='Time'/>
            {errorMessage.time && <div className="text-danger">{errorMessage.time}</div>}
        </div>

        <div className='input'>
            <label htmlFor='officer'>Officer</label>
            <input onChange={e=>setfofficer(e.target.value)} type='tel' id='officer' autoComplete='off' placeholder='Officer'/>
            {errorMessage.officer && <div className="text-danger">{errorMessage.officer}</div>}
        </div>

        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes</label>
            <input onChange={e=>setfspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
            {errorMessage.specialnotes && <div className="text-danger">{errorMessage.specialnotes }</div>}
        </div>

        
        <button onClick={navtoTable} className='bsubmit' type='button'>View Raids</button>

            
       
            <button onClick={addRF} className='bdsave'type='submit'>Save</button>
        


    </form>
    
    </div>
    </div>
    </Layout>

  ) 
}
export default RaidForm   
