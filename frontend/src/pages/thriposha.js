import React from 'react'
import Header from '../components/Header'; 
import '../styles/thriposha.css'
import { Link, useHistory } from 'react-router-dom';

const thriposha = () => {
  return (
    <div>
    <Header/>
    <div className='title'>

    <h3 >Thriposha Destribution</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Thriposha Type</label>
            <input type='text' id='bname' autoComplete='off' placeholder='Thriposha Type'/>
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

        <Link to="/Thriposhatable">
            <button className='bsave'type='submit'>Save</button>
        </Link>

    </form>
    
    </div>
    </div>
  )
}

export default thriposha