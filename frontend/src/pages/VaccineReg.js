import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from '../components/Header'; 
import '../styles/VaccineReg.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const VaccineReg = ({submitted,data}) => {
    const[vname,setvname]=useState('');
    const[manf_date,setmanf_date]=useState('');
    const[expi_Date,setexpi_Date]=useState('');
    const[quantity,setquantity]=useState('');
    const[notes,setnotes]=useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(!submitted){
            setvname('');
            setmanf_date('');
            setexpi_Date('');
            setquantity('');
            setnotes('');
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setvname(data.vname);
            setmanf_date(data.manf_date);
            setexpi_Date(data.expi_Date);
            setquantity(data.quantity);
            setnotes(data.notes);

        }
    },[data]);

    const navtoTable = () => {
        navigate('/VaccineRegTab');
    }

    const addvacc = async()=>{
        try{
            const response = await Axios.post('http://localhost:4000/api/addVac',{
                vname : vname,
                manf_date : manf_date,
                expi_Date: expi_Date,
                quantity: quantity,
                notes : notes,
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

    <h2 className="he2" >Vaccine Registration</h2>
    <form className='addvaccine'>
        <div className='input'>
            <label htmlFor='vname'>Vaccine Name :</label>
            <input onChange={e=>setvname(e.target.value)} type='text' id='vname' autoComplete='off' placeholder='Vaccine Name'/>
        </div>


        <div className='input'>
            <label htmlFor='ManDate'>Manufactured date:</label>
            <input onChange={e=>setmanf_date(e.target.value.toString())} type='date' id='ManDate' autoComplete='off' placeholder='Manufactured date'/>
        </div>

        <div className='input'>
            <label htmlFor='ExDate'>Expiration date :</label>
            <input onChange={e=>setexpi_Date(e.target.value.toString())} type='date' id='ExDate' autoComplete='off' placeholder='Expiration date'/>
        </div>


        <div className='input'>
            <label htmlFor='Quantity'>Quantity :</label>
            <input onChange={e=>setquantity(e.target.value)} type='text' id='Quantity' autoComplete='off' placeholder='Quantity'/>
        </div>


        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes :</label>
            <input onChange={e=>setnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
        </div>

        

        
            <button onClick={navtoTable} className='bsubmit' type='submit'>View vaccines</button>
            
            <button onClick={addvacc} className='bsave'type='submit'>Save</button>
             

            
            



    </form>
    
    </div>
    </div>
    )
}
export default VaccineReg

