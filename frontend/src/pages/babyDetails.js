
import React from 'react'
import '../styles/babydetails.css'
import Header from '../components/Header'; 
import { Link, useHistory } from 'react-router-dom';
import Layout from '../components/Layout';

const BabyDetails = () => {
  return (
    <Layout>

    <div>
    <div className='bdtitle'>

    <h3 className='he3'>Baby Details</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Baby Name</label>
            <input type='text' id='bname' autoComplete='off' placeholder='Baby Name'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Age</label>
            <input type='text' id='age' autoComplete='off' placeholder='Age'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Weight</label>
            <input type='text' id='weight' autoComplete='off' placeholder='Weight'/>
        </div>

        <div className='input'>
            <label htmlFor='contactnumber'>Contact Number</label>
            <input type='tel' id='contactnumber' autoComplete='off' placeholder='Contact Number'/>
        </div>

        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes</label>
            <input type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
        </div>

        
            <button className='bdsubmit' type='submit'>Cancel</button>

            
        <Link to="/Babytable">
            <button className='bdsave'type='submit'>Save</button>
        </Link>


    </form>
    
    </div>
    </div>
    </Layout>

  ) 
}

export default BabyDetails
