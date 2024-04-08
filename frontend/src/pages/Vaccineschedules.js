import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; 
import '../styles/Vaccineschedules.css';

const Vaccineschedules = () => {
  return (
    <Layout>
      <div className="layout-container2">
        <div className="assign-staff-container">
          <h3>Assign Staff for Vaccination Programs</h3> {/* Updated title */}
          <div className='form-box'>
            <form>
              <div>
                <label>Program Type:</label>
                <select name="programType">
                  <option value="">Select Program Type</option>
                  <option value="vaccination">Vaccination Program</option> {/* Updated option */}
                  <option value="awareness">Awareness Campaign</option> {/* If needed */}
                </select>
              </div>
              <div>
                <label>Staff Member:</label>
                <input type="text" name="staffMember" />
              </div>
              <div>
                <label>Date:</label>
                <input type="date" name="date" />
              </div>
              <div>
                <label>Location:</label>
                <input type="text" name="location" />
              </div>
              <div>
                <label>Description:</label>
                <textarea name="description" />
              </div>
              <button type="submit">Assign Staff</button>
              <Link to="/DengueAssignTable">
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
