import React from 'react'
import'../styles/denguecampaignschedule.css'

const DengueCampaignSchedule = () => {
    return(
        <div className='title'>
            <h3>Campaign Details</h3>
        <form className='campaigndetails'>
            <div className="input">
                <label htmlFor="venue">Venue</label>
                <input type="text" id="venue" name="venue" autoComplete='off' placeholder='Venue' /> 
            </div>
            <div className="input">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" autoComplete='off' placeholder='Date' />
            </div>
            <div className="input">
                <label htmlFor="stime">Starting Time</label>
                <input type="stime" id="stime" name="stime" autoComplete='off' placeholder='Starting Time' />
            </div>
            <div className="input">
                <label htmlFor="conductedby">Conducted by</label>
                <input type="conductedby" id="conductedby" name="conductedby" autoComplete='off' placeholder='Conductedby' />
            </div>
            <div className="input">
                <button type='submit' value="Submit">Save</button>
                <button type='submit' value="Cancel">Cancel</button> 

            </div>
        </form>
        </div>

        )
    }

    export default DengueCampaignSchedule