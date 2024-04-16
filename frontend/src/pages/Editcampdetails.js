import React, { useState } from 'react'
import Layout from '../components/Layout'
import { FaUser } from 'react-icons/fa'
import { Button, Form ,Alert} from 'react-bootstrap'
import '../styles/editcampdetails.css'

import Axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate ,useParams } from 'react-router-dom';


const Editcampdetails = () => {

  const {_id , venue, date, time, drName} = useParams();
  const [id_u , setID] = useState(_id);
  const [venue_u, setvenue] = useState(venue);
  const [date_u, setdate] = useState(date);
  const [time_u, settime] = useState(time);
  const [drName_u, setdrName] = useState(drName);
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const updateCampaign = async(_id,venue,date,time,drName) => {
       try{

        const response = await Axios.post('http://localhost:4000/api/updateCampaign',{
            _id:_id,
            venue,
            date,
            time,
            drName,
            });

            console.log("Campaign details updated successfully" , response.data);
        }catch(error){
            console.error('error' , error);
        }
    }

      const update = async() => {

    try{

            const response = await updateCampaign(id_u,venue_u,date_u,time_u ,drName_u);


      console.log(response);
        setID(_id);
        setvenue('');
        setdate('');
        settime('');
        setdrName('');
        navigate('/DengCampTab');
   }catch(error){
      console.log("Error" , error);
  }
  
}


      const confirmUpdate = () => {

        if(!venue_u || !date_u || !time_u || !drName_u){
            setErrorMessage('Please fill in all required fields');
            return;
        }

  
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: "Don't save"
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Saved!","Clinic updated successfully !! ", "success");
            update();
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
        });
    }

  return (
    <Layout>
        <div className='title2'>
            <h3 className='h23'>Campaign Details</h3>
            <form className='campaigndetails'>
                <div className="input">
                    <label className='venue' htmlFor="venue">Venue</label>
                    <input value={venue_u} onChange={e => setvenue(e.target.value)} type="text" id="venue" name="venue" autoComplete='off' placeholder='Venue' />
                </div>
                <div className="input">
                    <label htmlFor="date">Date</label>
                    <input value={date_u} onChange={e => setdate(e.target.value.toString())} type="date" id="date" name="date" autoComplete='off' placeholder='Date' />
                </div>
                <div className="input">
                    <label className='stime' htmlFor="stime">Starting Time</label>
                    <input onChange={e => settime(e.target.value)} type="stime" id="stime" name="stime" autoComplete='off' placeholder='Starting Time' />
                </div>
                <div className="input">
                    <label className='drname' htmlFor="conductedby">Conducted by</label>
                    <input onChange={e => setdrName(e.target.value)} type="conductedby" id="conductedby" name="conductedby" autoComplete='off' placeholder='Conductedby' />
                </div>
                <div className="input">
                    <button onClick={confirmUpdate} type='submit' value="Submit">Update</button>
                    <button type='submit' value="Cancel">Cancel</button>

                </div>
            </form>
        </div>
    </Layout>
);
};

export default Editcampdetails;