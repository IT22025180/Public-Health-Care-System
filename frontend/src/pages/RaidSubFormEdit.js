import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';
import Swal from 'sweetalert2';

const RaidSubFormEdit = () => {
  const { _id, location, details, sNote } = useParams();
  const [location_u, setslocation] = useState(location);
  const [details_u, setsdetails] = useState(details);
  const [specialnotes_u, setsspecialnotes] = useState(sNote);
  const [errorMessag, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const updateRS = async () => {
    try {
      const response = await Axios.post(`http://localhost:4000/api/updateRS`, {
        _id,
        location: location_u,
        details: details_u,
        specialNotes: specialnotes_u,
      });

      console.log('Raid Submission updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating Raid Form:', error);
    }
  };

  const updateF = async () => {
    try {
      await updateRS();
      setslocation('');
      setsdetails('');
      setsspecialnotes('');
      navigate('/RaidSubTable');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const conUpdate = () => {
    if (!location_u || !details  ||  !specialnotes_u) {
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
          <h3 className='he3'>Edit Raid Submission Form</h3>
          <form className='addRS'>
            <div className='input'>
              <label htmlFor='location'>Location</label>
              <input value={location_u} onChange={(e) => setslocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location' />
            </div>

            <div className='input'>
              <label htmlFor='details'>details</label>
              <input value={details_u} onChange={(e) => setsdetails(e.target.value)} type='text' id='details' autoComplete='off' placeholder='Details' />
            </div>

          
            <div className='input'>
              <label htmlFor='specialnotes'>Special Notes</label>
              <input value={specialnotes_u} onChange={(e) => setsspecialnotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes' />
            </div>

            <button className='bdsubmit' type='submit'>Cancel</button>

            <button onClick={conUpdate} className='bdsave' type='button'>Save</button>

            <Link to='/RaidSubTable' className='bdsave'>Back</Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RaidSubFormEdit;
