import React from 'react'
import Header from '../components/Header'; 
import '../styles/thriposha.css'
import { Link, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const Thriposha = () => {
  return (
    <Layout>
    <div>
    <div className='Ttitle'>

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


        <button className='tbsubmit' type='submit'>Cancel</button>

        <Link to="/Thriposhatable">
            <button className='tbsave'type='submit'>Save</button>
        </Link>

    </form>
    
    </div>
    </div>
    </Layout>
  )
}

export default Thriposha