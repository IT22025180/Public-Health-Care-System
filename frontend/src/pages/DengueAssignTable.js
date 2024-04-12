import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/DengueAssignTable.css';
import Axios from 'axios';
import Swal from 'sweetalert2';

const DengueAssignTable = () => {
  const [dengueStaff, setDengueStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getDengueStaff();
  }, []);

  const getDengueStaff = () => {
    Axios.get('http://localhost:4000/api/getstaffdengue')
      .then(response => {
        console.log('data from server', response.data);
        setDengueStaff(response.data.allstaffdengue);
      })
      .catch(error => {
        console.error("Axios error", error);
      });
  }

  const filteredStaff = dengueStaff.filter(staff =>
    staff.staffmember && staff.staffmember.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post('http://localhost:4000/api/deletestaffdengue', { _id: id })
          .then(response => {
            console.log('Staff deleted successfully');
            setDengueStaff(prevStaff => prevStaff.filter(staff => staff._id !== id)); // Update state after deletion
            // Display success message
            Swal.fire({
              title: "Deleted!",
              text: "The staff has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error deleting staff:', error);
            // Display error message
            Swal.fire({
              title: "Error",
              text: "Failed to delete staff.",
              icon: "error"
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle cancel action
        Swal.fire({
          title: "Cancelled",
          text: "The staff is safe ",
          icon: "error"
        });
      }
    });
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
                  <td>{staff.staffmember || '-'}</td>
                  <td>{staff.date}</td>
                  <td>{staff.location}</td>
                  <td>{staff.description}</td>
                  <td><button className="edit-button">Edit</button></td>
                  <td><button className="delete-button" onClick={() => handleDelete(staff._id)}>Delete</button></td>
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
