import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const DengueAssignTable = () => {
  const [denguedata, setDenguedata] = useState([]);

  useEffect(() => {
    getDengueData();
  }, []);

  const getDengueData = () => {
    Axios.get('http://localhost:4000/api/getstaffdengue')
      .then(response => {
        console.log('data from server', response.data);
        setDenguedata(response.data.allstaffdengue);
      })
      .catch(error => {
        console.error("Axios error: ", error);
      })
  };

  

  return (
    <div className='DengueAssignTable'>
      <h2>Dengue Assignments</h2>
      <TableContainer component={Paper}>
      <Table border={1} cellPadding={10} cellSpacing={0}>
        <TableHead>
          <TableRow>
            <TableCell>Venue</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Assigned Staff</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {denguedata && denguedata.length > 0 ? (
            denguedata.map((camp) => (
              <TableRow key={camp._id}>
                <TableCell>{camp.venue}</TableCell>
                <TableCell>{camp.date}</TableCell>
                <TableCell>{camp.time}</TableCell>
                <TableCell>{camp.staffmember}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6">No Dengue Assignments found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
};

export default DengueAssignTable;
