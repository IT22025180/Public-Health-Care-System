import React, { useEffect, useState } from 'react'
import Header from '../components/Header'; 
import '../styles/babyvaccination.css'
import { Link, useHistory } from 'react-router-dom'; 
import Layout from '../components/Layout';
import Axios from 'axios';

const BabyVaccination = (submitted,data) => {
    const[vtype,setvtype]=useState('');
    const[vesti_Date,setvdate]=useState('');
    const[vquantity,setvquantity]=useState(0);

    useEffect(()=>{
        if(!submitted){
            setvtype('');
            setvdate('');
            setvquantity('');
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setvtype(data.vtype);
            setvdate(data.vesti_Date);
            setvquantity(data.vquantity);
        }
    },[data]);

    const addbvaccine = async()=>{
        try{
            const response = await Axios.post('http://localhost:4000/api/addBabyVac',{
                type:vtype,
                esti_Date:vesti_Date,
                quantity:vquantity,
            });
            console.log('Successfully',response.data);
        }catch(error){
            console.error('error',error);
        }
    
        }

  return (
    <Layout>
    <div>
    <div className='bvtitle'>
    <h3 >Baby Vaccination</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Vaccine Type</label>
            <input onChange={e=>setvtype(e.target.value)} type='text' id='bname' autoComplete='off' placeholder='Vaccine Type'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Estimated Date</label>
            <input onChange={e=>setvdate(e.target.value.toString())} type='date' id='age' autoComplete='off' placeholder='Estimated Date'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Quantity</label>
            <input onChange={e=>setvquantity(e.target.value)} type='text' id='weight' autoComplete='off' placeholder='Quantity'/>
        </div>


        <button className='bvsubmit' type='submit'>Cancel</button>

        <Link to="/Bvaccinetable">
            <button onClick={addbvaccine} className='bvsave'type='submit'>Save</button>
        </Link>

    </form>
    
    </div>
    </div>
    </Layout>
    
  )
}

export default BabyVaccination