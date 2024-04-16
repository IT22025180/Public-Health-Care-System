
import React, { useEffect, useState } from 'react'
import '../styles/babydetails.css'
import Header from '../components/Header'; 
import { Link, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios  from 'axios';
import {useNavigate} from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import Swal from 'sweetalert2'

const BabyDetails = ({submitted,data}) => {
    const [bname,setbname]=useState('');
    const [age,setbage]=useState('');
    const[weight,setbweight]=useState('');
    const[contactnumber,setbcontactnumber]=useState('');
    const[specialnotes,setbspecialnotes]=useState('');
    const navigate=useNavigate();
    const[errorMessage,setErrorMessage]=useState('');

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

    
    const addbaby =async(e)=>{

        e.preventDefault();
        if(!bname || !age || !weight || !contactnumber || !specialnotes){
            setErrorMessage('Please fill in all required fields');
            return;
        }
        
        try{
        const response =await Axios.post('http://localhost:4000/api/addBaby',{
            bname : bname,
            age : age,
            weight: weight,
            co_no:contactnumber,
            notes:specialnotes,
        });

        console.log('Baby data adding is successful',response.data);
        Swal.fire({
         title:"Success!",
         text:"Baby data was added successfully",
         icon:"success",
         showConfirmButton:false,
         timer:2000
        });

        setbname('');
        setbage('');
        setbweight('');
        setbcontactnumber('');
        setbspecialnotes('');
        navigate('/Babytable');
         console.log('Successfully',response.data);
         console.log('Successfully',response.data);
        console.log('Successfully',response.data);

    }catch(error){
        console.error('error',error);
    }

    }


  return (
    <Layout>

    <div>
    <div className='bdtitle'>
    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

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

        
        <Link to="/Babytable">
        <button  onClick={addbaby} className='bddsave' type='submit'>Save</button>
        </Link>


    </form>
    
    </div>
    </div>
    </Layout>

  ) 
}

export default BabyDetails

