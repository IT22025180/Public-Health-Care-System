import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png';
import Swal from 'sweetalert2';
import '../styles/LeaveTable.css';

const LeaveTable = () => {
  const navigate = useNavigate();
  const [leavedata, setLeavedata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getLeavedata();
  }, []);

  const getLeavedata = () => {
    Axios.get('http://localhost:4000/api/Leave')
      .then(response => {
        console.log('data from server', response.data);
        setLeavedata(response.data.allLeave);
      })
      .catch(error => {
        console.error("Axios error:", error);
      });
  };

  const handleDelete = (id) => {
    // Delete functionality remains the same
    // ...
  };

  const generatePDF = (leave) => {
    // PDF generation functionality remains the same
    // ...
  };

  const handleSearch = () => {
    // Filter the leave data based on the search query
    const filteredData = leavedata.filter(leave =>
      leave.name.toLowerCase().includes(searchQuery.toLowerCase())
      || leave.staffid.toLowerCase().includes(searchQuery.toLowerCase())
      || leave.position.toLowerCase().includes(searchQuery.toLowerCase())
      || leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setLeavedata(filteredData);
  };

  return (
    <Layout>
      <div className='LeaveTable'>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, staff ID, position, leave type..."
          />
          <button className="searchButton" onClick={handleSearch}>Search</button>
        </div>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Staff ID</th>
              <th>Email</th>
              <th>Position</th>
              <th>Leaves For</th>
              <th>Leave Start</th>
              <th>Leave End</th>
              <th>Leave Type</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {leavedata && leavedata.length > 0 ? (
              leavedata.map((leave) => (
                <tr key={leave._id}>
                  <td>{leave.name}</td>
                  <td>{leave.staffid}</td>
                  <td>{leave.email}</td>
                  <td>{leave.position}</td>
                  <td>{leave.doleave}</td>
                  <td>{leave.leavestrt}</td>
                  <td>{leave.leaveend}</td>
                  <td>{leave.leaveType}</td>

                  <td className='actionButtons'>
                    <Link to={`/EditLeave/${leave._id}/${leave.name}/${leave.staffid}/${leave.email}/${leave.position}/${leave.doleave}/${leave.leavestrt}/${leave.leaveend}/${leave.leaveType}`}>
                      <button className="editButton">Edit</button>
                    </Link>
                  </td>

                  <td className='actionButtons'>
                    <button className="deleteButton" onClick={() => handleDelete(leave._id)}>Delete</button>
                  </td>
                  <td className='actionButtons'>
                    <button className="pdfButton" onClick={() => generatePDF(leave)}>Generate PDF</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">You have no leave data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );

};

export default LeaveTable;
