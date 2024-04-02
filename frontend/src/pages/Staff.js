import React from 'react';
import Layout from '../components/Layout';
import '../styles/Staff.css';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';

const Staff = () => {
  const navigate = useNavigate();

  const goToLeave = () => {
    navigate('/Leave');
  };

  const goToAllSchedules = () => {
    navigate('/Allschedules');
  };

  return (
    <Layout>
      <div className="home-page">
        <h1>Staff schedules</h1>
        <div className="card-container">
          <Sidebar className="app">
            <Menu>
              <MenuItem className="menu1">
                <h3>Staff schedules</h3>
              </MenuItem>
              <MenuItem onClick={goToAllSchedules}> All Schedules </MenuItem>
              <MenuItem> Vaccine Schedules </MenuItem>
              <MenuItem> Dengue Schedules </MenuItem>
              <MenuItem> Raids Schedules </MenuItem>
              <MenuItem> Staff Notices </MenuItem>
              <MenuItem onClick={goToLeave}> Leave Submissions </MenuItem>
              <MenuItem> Logout </MenuItem>
            </Menu>
          </Sidebar>
          <div className="card-content">
            <p>Content goes here...</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
