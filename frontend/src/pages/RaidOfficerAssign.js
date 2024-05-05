import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const RaidOfficerAssign = () => {
  const [officerData, setOfficerData] = useState([]);
  const [complaintData, setComplaintData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getOfficerData();
    getComplaintData();
  }, []);

  const getOfficerData = () => {
    Axios.get('http://localhost:4000/api/getraidofficer')
      .then(response => {
        console.log('Officer data from server', response.data);
        setOfficerData(response.data.allraidofficer);
      })
      .catch(error => {
        console.error("Axios error: ", error);
      });
  };

  const getComplaintData = () => {
    Axios.get('http://localhost:4000/api/Complain')
      .then(response => {
        console.log('Complaint data from server', response.data);
        setComplaintData(response.data);
      })
      .catch(error => {
        console.error("Axios error:", error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = officerData.filter(officer => {
    const fullName = `${officer.Name} ${officer.Type} ${officer.Address}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Layout>
      <div className='OfficerAssignTable'>
        <h2>Assign Officer</h2>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
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
              {filteredData.map((officer) => (
                <TableRow key={officer._id}>
                  <TableCell>{officer.Name}</TableCell>
                  <TableCell>{officer.Type}</TableCell>
                  <TableCell>{officer.Address}</TableCell>
                  <TableCell>{officer.officer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table border={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
              <TableRow>
                <TableCell>Complaint Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaintData.map((complaint) => (
                <TableRow key={complaint._id}>
                  <TableCell>{complaint.Name}</TableCell>
                  <TableCell>{complaint.Address}</TableCell>
                  <TableCell>{complaint.Type}</TableCell>
                  <TableCell>{complaint.officer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to="/Raidoffersforcomplain">
          <Button
            variant="contained"
            style={{ backgroundColor: '#ff5722', color: '#fff', marginTop: '10px' }}
          >
            Assign Staff
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default RaidOfficerAssign;
