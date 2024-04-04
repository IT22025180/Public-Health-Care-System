import React, { useEffect, useState } from 'react'
import'../styles/denguecampaignschedule.css'
import Axios from 'axios';

const DengueCampaigns = ({submitted,data}) => {
    const[venue,setvenue]=useState('');
    const[date,setdate]=useState('');
    const[time,settime]=useState('');
    const[drName,setdrName]=useState('');

    useEffect(()=>{
        if(!submitted){
            setvenue('');
            setdate('');
            settime('');
            setdrName('');
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setvenue(data.venue);
            setdate(data.date);
            settime(data.time);
            setdrName(data.drName);
        }
    },[data]);

    const addcamp = async()=>{
        try{
            const response = await Axios.post('http://localhost:4000/api/addCamp',{
                venue : venue,
                date : date,
                time : time,
                drName : drName,
            });

            console.log('Successfully',response.data); 
        }catch(error){
            console.error('error',error);
        }
    }
    return(
        <div className='title2'>
            <h3 className='h23'>Campaign Details</h3>
        <form className='campaigndetails'>
            <div className="input">
                <label htmlFor="venue">Venue</label>
                <input onChange={e=>setvenue(e.target.value)}type="text" id="venue" name="venue" autoComplete='off' placeholder='Venue' /> 
            </div>
            <div className="input">
                <label htmlFor="date">Date</label>
                <input onChange={e=>setdate(e.target.value.toString())}type="date" id="date" name="date" autoComplete='off' placeholder='Date' />
            </div>
            <div className="input">
                <label htmlFor="stime">Starting Time</label>
                <input onChange={e=>settime(e.target.value)}type="stime" id="stime" name="stime" autoComplete='off' placeholder='Starting Time' />
            </div>
            <div className="input">
                <label htmlFor="conductedby">Conducted by</label>
                <input onChange={e=>setdrName(e.target.value)}type="conductedby" id="conductedby" name="conductedby" autoComplete='off' placeholder='Conductedby' />
            </div>
            <div className="input">
                <button onClick={addcamp} type='submit' value="Submit">Save</button>
                <button type='submit' value="Cancel">Cancel</button> 

            </div>
        </form>
        </div>

        )
    }

    export default DengueCampaigns;