import React from 'react'
import Layout from '../components/Layout'
import '../styles/Raids.css'
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar,Menu,MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom"


const Raids=() =>{
 
    return(
        <Layout>
       
       <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          
          <MenuItem>Raid Schedule </MenuItem>
          <MenuItem>Raid Submission</MenuItem>
          
        </Menu>
      </Sidebar>
    </div>
    <div><h2>For law</h2>
       <h2>enforcement to</h2>
       <h2>handle raids</h2>
       <h2>effectively,the</h2>
       <h2>Raids Management</h2>
       <h2>System (RMS) is</h2>
       <h2>user-friendly.</h2>
       </div>
    
  

        </Layout>
    )
}

export default Raids