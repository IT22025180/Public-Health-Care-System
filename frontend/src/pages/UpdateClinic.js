import React, { useState } from 'react'
import Layout from '../components/Layout'
import { FaUser } from 'react-icons/fa'
import { Button, Form ,Alert} from 'react-bootstrap'
import '../styles/addClinics.css'

import Axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate ,useParams } from 'react-router-dom';

const UpdateClinic = () => {

    const {_id , date , time ,ctype , venue} = useParams();
    const [id_u , setID] = useState(_id);
    const[ctype_u , setCtype] = useState(ctype);
    const[date_u , setDate] = useState(date);
    const[time_u , setTime] = useState(time);
    const[venue_u , setVenue] = useState(ctype);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const updateClnics = async( _id,date,time,venue ,ctype) => {
        try{

            const response = await Axios.post('http://localhost:4000/api/updateClinic',{
            _id : _id,
            date,
            time,
            venue,
            ctype
            });

            console.log("Clinic update is successful" , response.data);
        }catch(error){
            console.error('error' , error);
        }
    }

    const update = async() => {

        try{

            const response = await updateClnics(id_u,date_u,time_u,venue_u ,ctype_u);

        console.log(response);
            setID(_id);
            setCtype('');
            setDate('');
            setTime('');
            setVenue('');
            navigate('/adminClinics');
        }catch(error){
            console.log("Error" , error);
        }
        
    }

    const confirmUpdate = () => {

        if(!ctype_u || !date_u || !time_u || !venue_u){
            setErrorMessage('Please fill in all required fields');
            return;
        }

        Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Saved!","Clinic updated successfully !! ", "success");
            update();
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
        });
    }

  return (
    <Layout>
        
      <div className='clcontainer'>
        <div className='cl1'>
            <FaUser/>
            <p>Dr. kk</p>
        </div>
        <div className='frm'>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <h2>Update clinic appointment</h2>
            <p>ID : {_id}</p>
            <br/>
            <div className='rdgrp'>
                <div className='rdbtn'>
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                   value='Dengue'
                   checked={ctype === 'Dengue'}
                   onChange={e => setCtype(e.target.value)}/>
                <label class="form-check-label" for="flexRadioDefault1">
                    Dengue
                </label>
                </div>
                <div className='rdbtn'>
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
                 value='Dental'
                 checked={ctype === 'Dental'}
                 onChange={e => setCtype(e.target.value)}/>
                <label class="form-check-label" for="flexRadioDefault2">
                    Dental
                </label>
                </div>
            </div>
            <br/>
            <div className='slcbtn'>
                <p>Select date :</p>
                <Form>
                    <Form.Group>
                        <Form.Control
                        type='date'
                        value={date_u}
                        onChange={e=> setDate(e.target.value.toString())}/>
                    </Form.Group>
                </Form>
            </div>
            <br/>
            <div className='slcbtn'>
                <p>Select time : </p>
                <Form.Group>
                    <Form.Control as='select' size='sm' value={time_u} onChange={e => setTime(e.target.value)}>
                        <option >Select time</option>
                        <option >07 : 00</option>
                        <option >07 : 30</option>
                        <option >08 : 00</option>
                        <option >08 : 30</option>
                        <option >09 : 00</option>
                        <option >09 : 30</option>
                        <option >10 : 00</option>
                        <option >10 : 30</option>
                        <option >11 : 00</option>
                        <option >11 : 30</option>
                        <option >12 : 00</option>
                        <option >12 : 30</option>
                        <option >13 : 00</option>
                        <option >13 : 30</option>
                        <option >14 : 00</option>
                        <option >14 : 30</option>
                        <option >15 : 00</option>
                        <option >15 : 30</option>
                        <option >16 : 00</option>
                        <option >16 : 30</option>
                        <option >17 : 00</option>
                        <option >17 : 30</option>
                        <option >18 : 00</option>
                        <option >18 : 30</option>
                        <option >19 : 00</option>
                    </Form.Control>
                </Form.Group>
            </div>
            <br/>
            <div className='slcbtn'>
                <p>Venue:</p>
                <Form>
                    <Form.Group>
                        <Form.Control
                        type='text'
                        value={venue_u}
                        onChange={e => setVenue(e.target.value)}
                        />
                    </Form.Group>
                </Form>    
            </div>
            <br/>
            
            <Button onClick={confirmUpdate}>Update</Button>
            <br/>
            <hr/>
            <br/>
        </div>    
      </div>
    </Layout>
  )
  
}

export default UpdateClinic;
