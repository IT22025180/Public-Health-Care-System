import React, { useState, useEffect } from "react";
import Axios from "axios";
import '../styles/FCDMTable.css';
import Swal from "sweetalert2";
import 'jspdf-autotable';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const FCDMTable = () => {
  const [DMdata, setDMdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getDOCMdata();
  }, []);

  // Read
  const getDOCMdata = () => {
    Axios.get('http://localhost:4000/api/Documents')
      .then(response => {
        console.log('Data from Server', response.data);
        setDMdata(response.data.allDocM);
      })
      .catch(error => {
        console.error('Axios Error:', error);
      });
  };

  // Delete
  const deleteDocument = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post('http://localhost:4000/api/deleteDocM', { _id: id })
          .then(() => {
            setDMdata(prevData => prevData.filter(ddata => ddata._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error deleting document:', error);
          });
      }
    });
  };

  // filterData
  const filterData = () => {
    return DMdata.filter(ddata => {
      const searchQueryLower = searchQuery.toLowerCase();
      const includesSearchQuery = (value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchQueryLower);
        }
        return false;
      };

      return includesSearchQuery(ddata.r_id) ||
        includesSearchQuery(ddata.ro_name) ||
        includesSearchQuery(ddata.date) ||
        includesSearchQuery(ddata.v_name) ||
        includesSearchQuery(ddata.v_type);
    });
  };

  const updateDocument = (ddata) => {
    setEditData(ddata);
  };

  return (
    <Layout>
      <>
        <h2>Document Management Table</h2>
        <div className="search">
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" />
        </div>
        <div className="FCDMTable">
          <Table border={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
              <TableRow>
                <TableCell>Case Number</TableCell>
                <TableCell>Raid Officer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Violator Name</TableCell>
                <TableCell>Violation Type</TableCell>
                <TableCell>Documents</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData().length > 0 ? (
                filterData().map((ddata) => (
                  <TableRow key={ddata._id}>
                    <TableCell>{ddata.r_id}</TableCell>
                    <TableCell>{ddata.ro_name}</TableCell>
                    <TableCell>{ddata.date}</TableCell>
                    <TableCell>{ddata.v_name}</TableCell>
                    <TableCell>{ddata.v_type}</TableCell>
                    <TableCell className="evidence-cellDM">
                      {Array.isArray(ddata.documents) && ddata.documents.length > 0 ? (
                        ddata.documents.map((documents, index) => (
                          <div className="files" key={index}>
                            <a href={`data:${documents.contentType};base64,${documents.data}`} download={`file_${index}`}>
                              File {index + 1}
                            </a>
                          </div>
                        ))
                      ) : (
                        <span>No evidence</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link to={`/FCDMEdit/${encodeURIComponent(ddata._id)}/${encodeURIComponent(ddata.r_id)}/${encodeURIComponent(ddata.ro_name)}/${encodeURIComponent(ddata.date)}/${encodeURIComponent(ddata.v_name)}/${encodeURIComponent(ddata.v_type)}`}>
                        <Button className="editButton" variant="contained" color="primary"><FaEdit /></Button>
                      </Link>
                      <Button className="deleteButton" variant="contained" color="secondary" onClick={() => deleteDocument(ddata._id)}><FaTrash /></Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="8">No Data Available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </>
    </Layout>
  );
};

export default FCDMTable;
