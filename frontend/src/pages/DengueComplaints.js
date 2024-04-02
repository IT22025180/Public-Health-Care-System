import React from 'react'
import'../styles/denguecomplaints.css'

const DengueComplaints = () => {
    return(
        <div className='title'>
        <h3>Add Complaint</h3>
        <form className='addcomplaintform'>
            <div className="input">
                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" autoComplete='off' placeholder='Location' /> 
            </div>
            <div className="input">
            <label htmlFor="description">Description   </label><br/>
            <textarea  id="description" name="description" autoComplete='off' placeholder='Description' rows="4" cols="50"/>
            </div>
            <div className="input">
                <button type='submit' value="Submit">Save</button>
                <button type='submit' value="Cancel">Cancel</button> 

            </div>
        </form>
        </div>
    )
}

export default DengueComplaints