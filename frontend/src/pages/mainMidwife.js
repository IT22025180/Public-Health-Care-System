import React from 'react'
import Header from '../components/Header'; 
import { Link } from 'react-router-dom'; 
import '../styles/mainmidwife.css'
import Layout from '../components/Layout';

const MainMidwife = () => {
  return (
    <Layout>
    <div>
<form className='mainmidwife'>
        <h2 >Empowering Health: Nurturing Wellness in Public Care Systems</h2>

        <Link to="/babydetails">
        <button className='bdetailsbutton'type="bdetailsbutton">Baby Details</button>
        </Link>


        <Link to="/babyVaccination">
        
        <button className='vaccinebutton'type='vaccinebutton'>Baby Vaccine</button>
        </Link>

        <Link to="/thriposha">
        <button className='thriposhabutton'type='thriposhabutton'>Thriposha Destribution</button>
        </Link>
        
        </form>
    </div>
    </Layout>
  )
}

export default MainMidwife