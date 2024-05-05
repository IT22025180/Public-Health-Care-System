import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const RaidOfficerAssign = () => {
  const [officerdata, setofficerdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getOfficerData();
  }, []);

  const getOfficerData = () => {
    Axios.get('http://localhost:4000/api/getraidofficer')
      .then(response => {
        console.log('data from server', response.data);
        setofficerdata(response.data.allraidofficer);
        setFilteredData(response.data.allraidofficer); // Initialize filteredData with all data
      })
      .catch(error => {
        console.error("Axios error: ", error);
      })
  };



  return (
    <Layout>
      <div className='OfficerAssignTable'>
      <h2>DAssign Officer</h2>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <TableContainer component={Paper}>
        <Table border={1} cellPadding={10} cellSpacing={0}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Assign Officer</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((camp) => (
                <TableRow key={camp._id}>
                  <TableCell>{camp.venue}</TableCell>
                  <TableCell>{camp.date}</TableCell>
                  <TableCell>{camp.time}</TableCell>
                  <TableCell>{camp.staffmember}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(camp._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="5">No Dengue Assignments found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/Dengueschedules">
        <button className="denbtn" style={{ backgroundColor: '#ff5722', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Assign Staff</button>
      </Link>
    </div>
    </Layout>
  );
};

export default RaidOfficerAssign;