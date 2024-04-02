import React from "react";
import Layout from "../components/Layout";
import Header from '../components/Header'; 
import '../styles/VaccineReg.css'

const VaccineReg = () => {
    return(
        <div>
            <Header />
    
    <div className='title1'>

    <h2 className="he2" >Vaccine Registration</h2>
    <form className='addvaccine'>
        <div className='input'>
            <label htmlFor='vname'>Vaccine Name :</label>
            <input type='text' id='vname' autoComplete='off' placeholder='Vaccine Name'/>
        </div>


        <div className='input'>
            <label htmlFor='ManDate'>Manufactured date :</label>
            <input type='date' id='ManDate' autoComplete='off' placeholder='Manufactured date'/>
        </div>

        <div className='input'>
            <label htmlFor='ExDate'>Expiration date :</label>
            <input type='date' id='ExDate' autoComplete='off' placeholder='Expiration date'/>
        </div>


        <div className='input'>
            <label htmlFor='specialnotes'>Special Notes :</label>
            <input type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes'/>
        </div>

        
        

        
            <button className='bsubmit' type='submit'>Cancel</button>
            <button className='bsave'type='submit'>Save</button>



    </form>
    
    </div>
    </div>
    )
}
export default VaccineReg

