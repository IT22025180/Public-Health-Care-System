import React, { useState, useEffect } from "react";
import Axios from "axios";
import '../styles/FCDMTable.css';
import Swal from "sweetalert2";
import 'jspdf-autotable';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

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
          <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
              <tr>
                <th>Case Number</th>
                <th>Raid Officer</th>
                <th>Date</th>
                <th>Violator Name</th>
                <th>Violation Type</th>
                <th>Documents</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filterData().length > 0 ? (
                filterData().map((ddata) => (
                  <tr key={ddata._id}>
                    <td>{ddata.r_id}</td>
                    <td>{ddata.ro_name}</td>
                    <td>{ddata.date}</td>
                    <td>{ddata.v_name}</td>
                    <td>{ddata.v_type}</td>
                    <td className="evidence-cellDM">
                      {Array.isArray(ddata.documents) && ddata.documents.length > 0 ? (
                        ddata.documents.map((documents, index) => (
                          <div key={index}>
                            <a href={`data:${documents.contentType};base64,${documents.data}`} download={`file_${index}`}>
                              File {index + 1}
                            </a>
                          </div>
                        ))
                      ) : (
                        <span>No evidence</span>
                      )}
                    </td>
                    <td>
                      <Link to={`/FCDMEdit/${encodeURIComponent(ddata._id)}/${encodeURIComponent(ddata.r_id)}/${encodeURIComponent(ddata.ro_name)}/${encodeURIComponent(ddata.date)}/${encodeURIComponent(ddata.v_name)}/${encodeURIComponent(ddata.v_type)}`}>
                        <button className="edtBtn">Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button className='deleteBtn' onClick={() => deleteDocument(ddata._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    </Layout>
  );
};

export default FCDMTable;
