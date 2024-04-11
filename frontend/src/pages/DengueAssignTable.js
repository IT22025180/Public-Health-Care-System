import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/DengueAssignTable.css';
import Axios from 'axios';

const DengueAssignTable = () => {
  const [denguestaff, setDenguestaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getDengueStaff();
  }, []);

  const getDengueStaff = () => {
    Axios.get('http://localhost:4000/api/getstaffdengue')
      .then(response => {
        console.log('data from server', response.data);
        setDenguestaff(response.data.allstaffdengue);
      })
      .catch(error => {
        console.error("Axios error", error);
      });
  }

  const filteredStaff = denguestaff.filter(staff =>
    staff.staffmember.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout>
      <div className="assigned-staff-table">
        <h3>Assigned Staff</h3>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Staff Member"
          />
        </div>
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
            {filteredStaff.length > 0 ? (
              filteredStaff.map(staff => (
                <tr key={staff._id}>
                  <td>{staff.type}</td>
                  <td>{staff.staffmember}</td>
                  <td>{staff.date}</td>
                  <td>{staff.location}</td>
                  <td>{staff.description}</td>
                  <td><button className="edit-button">Edit</button></td>
                  <td><button className="delete-button">Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No staff found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default DengueAssignTable;
