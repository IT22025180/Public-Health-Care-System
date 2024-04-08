import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; 
import '../styles/RaidSchedules.css'; // Update the CSS file path accordingly

const RaidSchedules = () => {
  return (
    <Layout>
      <div className="layout-container3">
        <div className="assign-staff-container">
          <h3>Schedule Staff for Raids</h3> {/* Updated title */}
          <div className='form-box'>
            <form>
              <div>
                <label>Raid Type:</label> {/* Updated label */}
                <select name="raidType"> {/* Updated select name */}
                  <option value="">Select Raid Type</option>
                  <option value="house">House Raid</option> {/* Updated option */}
                  <option value="area">Area Raid</option> {/* Updated option */}
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
              <button type="submit">Schedule Raid</button> {/* Updated button label */}
              <Link to="/RaidsAssign">
                <button className="view-programs">View Scheduled Raids</button> {/* Updated button label */}
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RaidSchedules;
