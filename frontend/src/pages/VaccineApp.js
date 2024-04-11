import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from '../components/Header'; 
import '../styles/VaccineApp.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const VaccineApp = ({submitted,data}) => {
    const[v_name,setv_name]=useState('');
    const[quantity,setq_uantity]=useState('');
    const[date,setDate]=useState('');
    const[location,setlocation]=useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(!submitted){
            setv_name('');
            setq_uantity('');
            setDate('');
            setlocation('');
            
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setv_name(data.v_name);
            setq_uantity(data.quantity);
            setDate(data.date);
            setlocation(data.location);
            

        }
    },[data]);

    const navtoTable = () => {
        navigate('/VaccineAppTab');
    }

    const addvacapp = async()=>{
        try{
            const response = await Axios.post('http://localhost:4000/api/addVacApp',{
                v_name : v_name,
                quantity : quantity,
                date: date,
                location: location,
                
            });

            console.log('Successfully',response.data);
            
        }catch(error){
            console.error('error',error);
        }
    }

    return(
        <div>
            <Header />
    
    <div className='title1'>

    <h2 className="head2" >Vaccination Appointments</h2>
    <form className='addvaccineapp'>
        <div className='input'>
            <label htmlFor='v_name'>Vaccine Name :</label>
            <input onChange={e=>setv_name(e.target.value)} type='text' id='v_name' autoComplete='off' placeholder='Vaccine Name'/>
        </div>


        <div className='input'>
            <label htmlFor='quantity'>Quantity :</label>
            <input onChange={e=>setq_uantity(e.target.value)} type='text' id='quantity' autoComplete='off' placeholder='Quantity'/>
        </div>

        <div className='input'>
            <label htmlFor='date'>Date :</label>
            <input onChange={e=>setDate(e.target.value.toString())} type='date' id='date' autoComplete='off' placeholder='Date'/>
        </div>


        


        <div className='input'>
            <label htmlFor='location'>Location :</label>
            <input onChange={e=>setlocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='location'/>
        </div>

        

        
            <button onClick={navtoTable} className='bappview' type='submit'>View Appointments</button>
            
            <button onClick={addvacapp} className='bappsave'type='submit'>Save</button>
             

            
            



    </form>
    
    </div>
    </div>
    )
}
export default VaccineApp

