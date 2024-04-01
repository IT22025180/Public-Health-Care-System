import React from 'react'
import Layout from '../components/Layout'
import { FaUser } from 'react-icons/fa'
import { Button, Form } from 'react-bootstrap'
import '../styles/addClinics.css'
import PatientReport from './PatientReport'


const AddClinic = () => {
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
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label class="form-check-label" for="flexRadioDefault1">
                    Dengue
                </label>
                </div>
                <div className='rdbtn'>
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
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
                        />
                    </Form.Group>
                </Form>
            </div>
            <br/>
            <div className='slcbtn'>
                <p>Select time : </p>
                <Form.Group>
                    <Form.Control as='select' size='sm'>
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
                        />
                    </Form.Group>
                </Form>

                <Button className='btn'>Generate report</Button>
            </div>
            <br/>
            <Button>Submit</Button>
        </div>
      </div>
    </Layout>
  )
}

export default AddClinic;
