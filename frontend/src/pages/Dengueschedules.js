import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Dengueschedules.css';

const Dengueschedules = () => {
  return (
    <Layout>
      <div className="layout-container1">
        <div className="assign-staff-container">
          <h3>Assign Staff for Dengue Prevention Programs and Awareness Campaigns</h3>
          <div className='form-box'>
            <form>
              <div>
                <label>Program Type:</label>
                <select name="programType">
                  <option value="">Select Program Type</option>
                  <option value="prevention">Dengue Prevention Program</option>
                  <option value="awareness">Dengue Awareness Campaign</option>
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

export default Dengueschedules;
