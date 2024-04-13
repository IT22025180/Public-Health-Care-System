
import React, { useEffect, useState } from 'react'
import '../styles/babydetails.css'
import Header from '../components/Header'; 
import { Link, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios  from 'axios';
import {Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

const BabyDetails = ({submitted,data}) => {
    const [bname,setbname]=useState('');
    const [age,setbage]=useState('');
    const[weight,setbweight]=useState('');
    const[contactnumber,setbcontactnumber]=useState('');
    const[specialnotes,setbspecialnotes]=useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if(!submitted){
            setbname('');
            setbage('');
            setbweight('');
            setbcontactnumber('');
            setbspecialnotes('');

        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setbname(data.bname);
            setbage(data.age);
            setbweight(data.weight);
            setbcontactnumber(data.contactnumber);
            setbspecialnotes(data.specialnotes);
        }
    },[data]);

    
    const addbaby =async()=>{


        
        try{
        const response =await Axios.post('http://localhost:4000/api/addBaby',{
            bname : bname,
            age : age,
            weight: weight,
            co_no:contactnumber,
            notes:specialnotes,
        });

        console.log('Successfully',response.data);
    }catch(error){
        console.error('error',error);
    }

    }


  return (
    <Layout>

    <div>
    <div className='bdtitle'>
 
    <h3 className='he3'>Baby Details</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Baby Name</label>
            <input onChange={e=>setbname(e.target.value)} type='text' id='bname' autoComplete='off' placeholder='Baby Name'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Age</label>
            <input onChange={e=>setbage(e.target.value)} type='text' id='age' autoComplete='off' placeholder='Age'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Weight</label>
            <input onChange={e=>setbweight(e.target.value)} type='text' id='weight' autoComplete='off' placeholder='Weight'/>
        </div>

        <div className='input'>
            <label htmlFor='contactnumber'>Contact Number</label>
            <input maxLength={10} onChange={e=>setbcontactnumber(e.target.value.slice(0,10))} type='tel' id='contactnumber' autoComplete='off' placeholder='Contact Number'/>
        </div>

        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes</label>
            <input onChange={e=>setbspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
        </div>

        
            <button className='bdsubmit' type='submit'>Cancel</button>


        <Link to="/Babytable">
        <button  onClick={addbaby} className='bdsave' type='submit'>Save</button>
        </Link>


    </form>
    
    </div>
    </div>
    </Layout>

  ) 
}

export default BabyDetails

