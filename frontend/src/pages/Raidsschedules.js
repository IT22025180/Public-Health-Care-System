import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import Axios from 'axios'; 
import '../styles/RaidSchedules.css';


const RaidSchedules = ({ submitted, data }) => {
  const [name, setName] = useState('');
  const [staffmember, setStaffmember] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const addstaffraids = async () => {
    try {
      const response = await Axios.post('http://localhost:4000/api/addstaffraids', {
        type: name,
        staffmember: staffmember,
        date: date,
        location: location,
        description: description
      });
      console.log('Successfully', response.data);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    if (!submitted) {
      setName('');
      setStaffmember('');
      setDate('');
      setLocation('');
      setDescription('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setName(data.name);
      setStaffmember(data.staffmember);
      setDate(data.date);
      setLocation(data.location);
      setDescription(data.description);
    }
  }, [data]);

  return (
    <Layout>
      <div className="layout-container3">
        <div className="assign-staff-container">
          <h3>Schedule Staff for Raids</h3>
          <div className='form-box'>
            <form >
              <div>
                <label>Raid Type:</label>
                <select onChange={e => setName(e.target.value)} value={name}>
                  <option value="">Select Raid Type</option>
                  <option value="house">House Raid</option>
                  <option value="area">Area Raid</option>
                </select>
              </div>
              <div>
                <label>Staff Member:</label>
                <input onChange={e => setStaffmember(e.target.value)} type="text" value={staffmember} />
              </div>
              <div>
                <label>Date:</label>
                <input onChange={e => setDate(e.target.value.toString())} type="date" value={date} />
              </div>
              <div>
                <label>Location:</label>
                <input onChange={e => setLocation(e.target.value)} type="text" value={location} />
              </div>
              <div>
                <label>Description:</label>
                <textarea onChange={e => setDescription(e.target.value)} value={description} />
              </div>
              <Link to="/raidsAssign">
                <button type="button" onClick={addstaffraids}>Assign Staff</button>
                <button className="view-programs">View Scheduled Programs</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RaidSchedules;
