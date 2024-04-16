import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Layout from '../components/Layout';

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

  const handleDelete = (id) => {
    // Perform deletion from the database
    Axios.post('http://localhost:4000/api/deletestaffdengue',{ _id: id })
      .then(response => {
        console.log('Deleted successfully');
        // Update state to reflect the deletion
        setDenguedata(prevData => prevData.filter(camp => camp._id !== id));
      })
      .catch(error => {
        console.error("Axios delete error: ", error);
      });
  };

  return (
    <Layout>
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
            <TableCell>Action</TableCell> {/* Add this column for delete button */}
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
      <Link to="/Dengueschedules"> {/* Use Link to navigate */}
            <button className="denbtn" style={{ backgroundColor: '#ff5722', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Assign Staff</button>
      </Link>
    </div>
    </Layout>
  );
};

export default DengueAssignTable;
