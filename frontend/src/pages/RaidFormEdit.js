import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';
import Swal from 'sweetalert2';

const RaidFormEdit = () => {
  const { _id, location, date, time, officer, sNote } = useParams();
  const [location_u, setflocation] = useState(location);
  const [date_u, setfdate] = useState(date);
  const [time_u, setftime] = useState(time);
  const [officer_u, setfofficer] = useState(officer);
  const [specialnotes_u, setfspecialnotes] = useState(sNote);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const updateRF = async () => {
    try {
      const response = await Axios.post(`http://localhost:4000/api/updateRF`, {
        _id,
        location: location_u,
        date: date_u,
        time: time_u,
        officer: officer_u,
        sNote: specialnotes_u,
      });

      console.log('Raid Form updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating Raid Form:', error);
    }
  };

  const updateF = async () => {
    try {
      await updateRF();
      setflocation('');
      setfdate('');
      setftime('');
      setfofficer('');
      setfspecialnotes('');
      navigate('/RaidFormTable');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const conUpdate = () => {
    if (!location_u || !date_u || !time_u || !officer_u || !specialnotes_u) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save `,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved', 'updated successfully!!', 'success');
        updateF();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  return (
    <Layout>
      <div>
        <div className='bdtitle'>
          <h3 className='he3'>Edit Raid Form</h3>
          <form className='addRF'>
            <div className='input'>
              <label htmlFor='location'>Location</label>
              <input value={location_u} onChange={(e) => setflocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location' />
            </div>

            <div className='input'>
              <label htmlFor='date'>Date</label>
              <input value={date_u} onChange={(e) => setfdate(e.target.value)} type='text' id='date' autoComplete='off' placeholder='Date' />
            </div>

            <div className='input'>
              <label htmlFor='time'>Time</label>
              <input value={time_u} onChange={(e) => setftime(e.target.value)} type='text' id='time' autoComplete='off' placeholder='Time' />
            </div>

            <div className='input'>
              <label htmlFor='officer'>Officer</label>
              <input value={officer_u} onChange={(e) => setfofficer(e.target.value)} type='tel' id='officer' autoComplete='off' placeholder='Officer' />
            </div>

            <div className='input'>
              <label htmlFor='specialnotes'>Special Notes</label>
              <input value={specialnotes_u} onChange={(e) => setfspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes' />
            </div>

            <button className='bdsubmit' type='submit'>Cancel</button>

            <button onClick={conUpdate} className='bdsave' type='button'>Save</button>

            <Link to='/RaidFormTable' className='bdsave'>Back</Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RaidFormEdit;
