import React from 'react'
import Header from '../components/Header'; 
import '../styles/babyvaccination.css'
import { Link, useHistory } from 'react-router-dom'; 

const babyVaccination = () => {
    
  return (
    <div>
    <Header />
    <div className='title'>
    <h3 >Baby Vaccination</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Vaccine Type</label>
            <input type='text' id='bname' autoComplete='off' placeholder='Vaccine Type'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Estimated Date</label>
            <input type='date' id='age' autoComplete='off' placeholder='Estimated Date'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Quantity</label>
            <input type='text' id='weight' autoComplete='off' placeholder='Quantity'/>
        </div>


        <button className='bsubmit' type='submit'>Cancel</button>

        <Link to="/Bvaccinetable">
            <button className='bsave'type='submit'>Save</button>
        </Link>

    </form>
    
    </div>
    </div>
    
  )
}

export default babyVaccination