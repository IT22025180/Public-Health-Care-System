import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"; 
import '../styles/VaccineRequest.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const VaccineRequest = ({submitted,data}) => {
    const[vName,setvName]=useState('');
    const[quantity,setQuantity]=useState('');
   

    const navigate = useNavigate();

    useEffect(()=>{
        if(!submitted){
            setvName('');
            setQuantity('');
            
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setvName(data.vName);
            setQuantity(data.quantity);
            

        }
    },[data]);

    const navtoTable = () => {
        navigate('/VaccineRequestTab');
    }

    const addvacc = async()=>{
        try{
            const response = await Axios.post('http://localhost:4000/api/addVacRq',{
                vName : vName,
                quantity : quantity,
                
            });

            console.log('Successfully',response.data);
            
        }catch(error){
            console.error('error',error);
        }
    }

    return(
        <Layout>

        <div>
            
            <div className='title1'>

            <h2 className="he2" >Vaccine Requests</h2>
            <form className='addvaccineRequests'>
                <div className='input'>
                    <label htmlFor='vName'>Vaccine Name :</label>
                    <input onChange={e=>setvName(e.target.value)} type='text' id='vName' autoComplete='off' placeholder='Vaccine Name'/>
                </div>



                <div className='input'>
                    <label htmlFor='quantity'>Quantity :</label>
                    <input onChange={e=>setQuantity(e.target.value)} type='text' id='quantity' autoComplete='off' placeholder='Quantity'/>
                </div>

        

        
            <button onClick={navtoTable} className='bReqView' type='submit'>View vaccines Requests</button>
            
            <button onClick={addvacc} className='bReqsave'type='submit'>Save</button>
             

            
            



    </form>
    
    </div>
    </div>
    </Layout>
    )
}
export default VaccineRequest

