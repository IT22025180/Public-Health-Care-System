import React from "react";
import Layout from '../components/Layout'
import '../styles/Vaccines.css'
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import VaccineReg from "./VaccineReg";


const Vaccines = () => {
    
    
    const navigate = useNavigate();
    const VaccineReg = () => {
        navigate('/VaccineReg');
    }


    return(
        <Layout>
            <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem className="menu1">
            <h3>Vaccines</h3>
          </MenuItem>
          <MenuItem onClick={VaccineReg}> Registration </MenuItem>
          <MenuItem> Appointments </MenuItem>
          <MenuItem> Vaccine Records </MenuItem>
          <MenuItem> Vaccine Requests </MenuItem>
          <MenuItem> Special Notices </MenuItem>
          
        </Menu>
      </Sidebar>
      
    </div>

    
        </Layout>
    )
}
export default Vaccines;


