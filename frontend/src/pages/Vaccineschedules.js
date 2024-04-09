import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; 
import '../styles/Vaccineschedules.css';
import Axios from 'axios';

const Vaccineschedules = ({ submitted, data }) => {
  const [name, setName] = useState('');
  const [staffmember, setStaffmember] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

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

  const addstaffvaccine = async () => {
    try {
      const response = await Axios.post('http://localhost:4000/api/addstaffvaccine', {
        V_type: name,
        V_staffmember: staffmember,
        V_date: date,
        V_location: location,
        V_description: description
      });
      console.log('Successfully', response.data);
    } catch (error) {
      console.error('error', error);
    }
  }
  return (
    <Layout>
      <div className="layout-container2">
        <div className="assign-staff-container">
          <h3>Assign Staff for Vaccination Programs</h3> {/* Updated title */}
          <div className='form-box'>
            <form>
            <div>
               <label>Program Type:</label>
           <select onChange={e => setName(e.target.value)} value={name}>
           <option value="">Select Program Type</option>
           <option value="vaccination">Vaccination Program</option>
           <option value="vaccination">Awareness Program</option> {/* Updated option */}
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
              
              <Link to="/VaccineAssignTable">
              <button type="button" onClick={addstaffvaccine}>Assign Staff</button>
                <button className="view-programs">View Scheduled Programs</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vaccineschedules;
