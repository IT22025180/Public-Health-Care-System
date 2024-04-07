import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { FaUser } from 'react-icons/fa'
import { Button, Form } from 'react-bootstrap'
import '../styles/addClinics.css'
import PatientReport from './PatientReport'
import Axios from 'axios'
import Swal from 'sweetalert2'
import AdminClinic from './AdminClinic'

const AddClinic = ({submitted,data}) => {

    const[ctype , setCtype] = useState('');
    const[date , setDate] = useState('');
    const[time , setTime] = useState('');
    const[venue , setVenue] = useState('');

    useEffect(() => {
        if(!submitted){
            setCtype('');
            setDate('');
            setTime('');
            setVenue('');
        }
    }, [submitted]);

    useEffect(() => {
        if(data?.id && data.id !==0){
            setCtype(data.ctype);
            setDate(data.date);
            setTime(data.time);
            setVenue(data.venue);
        }
    }, [data]);

    const addClnics = async() => {
        try{

            const response = await Axios.post('http://localhost:4000/api/addClinic',{

            ctype : ctype,
            date : date,
            time : time,
            venue : venue,
            });

            console.log("Clinic adding is successful" , response.data);
            Swal.fire({
                title: "Success !",
                text: "Clinic added successfully",
                icon: "success"
              });
            
            
        }catch(error){
            console.error('error' , error);
        }
    }

  return (
    <Layout>
      <div className='clcontainer'>
        <div className='cl1'>
            <FaUser/>
            <p>Dr. kk</p>
        </div>
        <div className='frm'>
            <h2>Add a Clinic appointment</h2>
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
                        value={date}
                        onChange={e=> setDate(e.target.value.toString())}/>
                    </Form.Group>
                </Form>
            </div>
            <br/>
            <div className='slcbtn'>
                <p>Select time : </p>
                <Form.Group>
                    <Form.Control as='select' size='sm' onChange={e => setTime(e.target.value)}>
                        <option disabled>Select time</option>
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
                        value={venue}
                        onChange={e => setVenue(e.target.value)}
                        />
                    </Form.Group>
                </Form>

                <Button className='btn'>Generate report</Button>
            </div>
            <br/>
            <Button onClick={addClnics}>Submit</Button>
        </div>
      </div>
      <AdminClinic/>
    </Layout>
  )
}

export default AddClinic;
