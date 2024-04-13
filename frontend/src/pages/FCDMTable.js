import React, { useState, useEffect } from "react";
import Axios from "axios";
import '../styles/FCDMTable.css';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
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

  // Search
  const filterData = DMdata.filter(dmdata => {
    return dmdata.ro_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dmdata.r_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dmdata.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dmdata.v_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dmdata.v_type.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Report Generate
  const GenReport = () => {
    const doc = new jsPDF();
    const title = "Fine And Court Document Management Report";
    const titleMargin = 20;
    const tableMargin = 20;
    const titleWidth = doc.getTextWidth(title);
    const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);

    doc.text(title, center, titleMargin);

    doc.autoTable({
      head: [['Report ID', 'Raid Officer', 'Date', 'Violator Name', 'Violation Type', 'Documents',]],
      body: DMdata.map((val) => [val.r_id, val.ro_name, val.date, val.v_name, val.v_type, val.documents]),
      startY: titleMargin + tableMargin
    });

    doc.save('Fine and Court Document Management Report.pdf');
  };

  // Update - Submit edited data
  const updateDocument = (ddata) => {
    setEditData(ddata); // Set the editData state with the data being edited
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
                <th>Report ID</th>
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
              {filterData && filterData.length > 0 ? (
                filterData.map((ddata) => (
                  <tr key={ddata._id}>
                    <td>{ddata.r_id}</td>
                    <td>{ddata.ro_name}</td>
                    <td>{ddata.date}</td>
                    <td>{ddata.v_name}</td>
                    <td>{ddata.v_type}</td>
                    <td>{ddata.documents}</td>
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
        <div className='genButton'>
          <button onClick={GenReport}>Generate Report</button>
        </div>
      </>
    </Layout>
  );
};

export default FCDMTable;
