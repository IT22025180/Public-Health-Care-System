import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/VaccineAssignTable.css';
import Axios from 'axios';

const VaccineAssignTable = () => {
  const [vaccinestaff, setVaccinestaff] = useState([]);

  useEffect(() => {
    getVaccineStaff();
  }, []);

  const getVaccineStaff = () => {
    Axios.get('http://localhost:4000/api/getstaffvaccine')
      .then(response => {
        console.log('data from server', response.data);
        setVaccinestaff(response.data.allstaffvaccine);
      })
      .catch(error => {
        console.error("Axios error", error);
      });
  }
    

    return (
        <Layout>
            <div className="assigned-staff-table">
          <h3>Assigned Staff</h3>
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>Program Type</th>
                <th>Staff Member</th>
                <th>Date</th>
                <th>Location</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {vaccinestaff && vaccinestaff.length > 0 ? (
              vaccinestaff.map(staff => (
                <tr key={staff._id}>
                  <td>{staff.V_type}</td>
                  <td>{staff.V_staffmember}</td>
                  <td>{staff.V_date}</td>
                  <td>{staff.V_location}</td>
                  <td>{staff.V_description}</td>
                  <td><button className="edit-button">Edit</button></td>
                  <td><button className="delete-button">Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No staff assigned</td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
        </Layout>
        
    );
};

export default VaccineAssignTable;
