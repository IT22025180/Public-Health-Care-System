import React, { useEffect, useState } from 'react'
import '../styles/RaidForm.css'
import { Link, useHistory, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios  from 'axios';


const RaidForm= ({submitted,data}) => {
    const [location,setflocation]=useState('');
    const [date,setfdate]=useState('');
    const[time,setftime]=useState('');
    const[officer,setfofficer]=useState('');
    const[specialnotes,setfspecialnotes]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
const navigate= useNavigate();


   
 
    

        
       
    const addRF =async()=>{
                // Check if any field is empty
                if (!location || !date || !time|| !officer|| !specialnotes) {
                    setErrorMessage("Please fill in all fields.");
                    return;
                }
        


        try{
        const response =await Axios.post('http://localhost:4000/api/addRF',{
            location :location,
            date : date,
            time:time,
            officer:officer,
            sNote:specialnotes,
        });
navigate('/raidformtable');
        console.log('Successfully',response.data);
    }catch(error){
        console.error('error',error);
    }

    }


  return (
    <Layout>

    <div>
    <div className='bdtitle'>

    <h3 className='he3'>Raid Form</h3>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <form className='addRF'>
        <div className='input'>
            <label htmlFor='location'>Location</label>
            <input onChange={e=>setflocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location'/>
        </div>

        <div className='input'>
            <label htmlFor='date'>Date</label>
            <input onChange={e=>setfdate(e.target.value)} type='text' id='date' autoComplete='off' placeholder='Date'/>
        </div>

        <div className='input'>
            <label htmlFor='time'>Time</label>
            <input onChange={e=>setftime(e.target.value)} type='text' id='time' autoComplete='off' placeholder='Time'/>
        </div>

        <div className='input'>
            <label htmlFor='officer'>Officer</label>
            <input onChange={e=>setfofficer(e.target.value)} type='tel' id='officer' autoComplete='off' placeholder='Officer'/>
        </div>

        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes</label>
            <input onChange={e=>setfspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
        </div>

        
            <button className='bdsubmit' type='submit'>Cancel</button>

            
       
            <button onClick={addRF} className='bdsave'type='submit'>Save</button>
        


    </form>
    
    </div>
    </div>
    </Layout>

  ) 
}
export default RaidForm   
