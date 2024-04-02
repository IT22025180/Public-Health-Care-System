import React from 'react'
import Layout from '../components/Layout'
import '../styles/Staff.css'
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
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
        <div>
      
      <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1">
            <h3>Staff schedules</h3>
          </MenuItem>
          <MenuItem onClick={goToAllSchedules}> All Schedules </MenuItem>
          <MenuItem> Vaccine Shedules </MenuItem>
          <MenuItem> Dengue schedules </MenuItem>
          <MenuItem> Raids schedules </MenuItem>
          <MenuItem> Staff notices </MenuItem>
          <MenuItem onClick={goToLeave}> Leave submissions </MenuItem>
          <MenuItem> Logout </MenuItem>
        </Menu>
      </Sidebar>
      
    </div>
    <div>
        <p></p>
    </div>
    </div>
    
    </Layout>
  )
}

export default Staff