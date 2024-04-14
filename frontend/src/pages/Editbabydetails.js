import React, { useState } from 'react'
import '../styles/babydetails.css'
import Layout from '../components/Layout'
import { Link, useNavigate ,useParams } from 'react-router-dom';
import  Axios  from 'axios';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';
import '../styles/babydetails.css';

const Editbabydetails = () => {
    const { _id, bname, age, weight, co_no, notes } = useParams();
    const [id_u, setID] = useState(_id);
    const [bname_u, setBname] = useState(bname);
    const [age_u, setBage] = useState(age);
    const [weight_u, setBweight] = useState(weight);
    const [co_no_u, setBco_no] = useState(co_no);
    const [notes_u, setBnotes] = useState(notes);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

   const updateBaby = async(_id , bname , age ,weight ,co_no ,notes) =>{

    try{
        const response = await Axios.post('http://localhost:4000/api/updateBaby',{
            _id : _id,
            bname,
            age,
            weight,
            co_no,
            notes
        });

        console.log("baby data update is successful",response.data);
    }catch(error){
        console.error('error', error);
    }
   }

    const update = async () => {
        try {
            await updateBaby(id_u, bname_u, age_u, weight_u, co_no_u, notes_u);
            // Reset state variables after successful update
            setID(_id);
            setBname('');
            setBage('');
            setBweight('');
            setBco_no('');
            setBnotes('');
            navigate('/Babytable');
        } catch (error) {
            console.log("Error", error);
        }
    }

   const confirmUpdate = (e) =>{
    e.preventDefault(); 
    if(!bname_u || !age_u || !weight_u || !co_no_u || !notes_u){
        setErrorMessage('Please fill in all required fields');
        return;
    }

    Swal.fire({
        title:"Do you want to save the changes?",
        showDenyButton:true,
        showCancelButton:true,
        confirmButtonText:"Save",
        denyButtonText:`Don't save `
    }).then((result)=>{
        if(result.isConfirmed){
          Swal.fire("Saved","updated successfully!!","success");
          update();
      }else if(result.isDenied){
        Swal.fire("Changes are not saved","","info");
      }
    });
   }

  return (
    <Layout>

    <div>
    <div className='bdtitle'>
    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

    <h3 className='he3'>Baby Details</h3>
    <form className='addbaby' >
        <div className='input'>
            <label htmlFor='bname'>Baby Name</label>
            <input value={bname_u}  onChange={e => setBname(e.target.value)}  type='text' id='bname' autoComplete='off' placeholder='Baby Name'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Age</label>
            <input value={age_u} onChange={e => setBage(e.target.value)}  type='text' id='age' autoComplete='off' placeholder='Age'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Weight</label>
            <input value={weight_u} onChange={e => setBweight(e.target.value)}  type='text' id='weight' autoComplete='off' placeholder='Weight'/>
        </div>

        <div className='input'>
            <label htmlFor='contactnumber'>Contact Number</label>
            <input  maxLength={10} value={co_no_u} onChange={e => setBco_no(e.target.value.slice(0,10))} type='tel' id='contactnumber' autoComplete='off' placeholder='Contact Number'/>
        </div>

        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes</label>
            <input value={notes_u} onChange={e => setBnotes(e.target.value)}  type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
        </div>

        
           
           
      
        <button onClick={confirmUpdate} className='bddsave'>Update</button>
        


    </form>
    
    </div>
    </div>
    </Layout>

  )
}

export default Editbabydetails;
