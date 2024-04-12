import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/RaidsAssignTable.css'; 
import Axios from 'axios';
import Swal from 'sweetalert2';

const RaidsAssignTable = () => {
  const [assignedRaids, setAssignedRaids] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAssignedRaids();
  }, []);

  const getAssignedRaids = () => {
    Axios.get('http://localhost:4000/api/getstaffraids') 
      .then(response => {
        console.log('data from server', response.data);
        setAssignedRaids(response.data.allstaffraids);
      })
      .catch(error => {
        console.error("Axios error", error);
      });
  }

  const filteredRaids = assignedRaids.filter(raid =>
    raid.staffmember.toLowerCase().includes(searchQuery.toLowerCase())
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
        Axios.post('http://localhost:4000/api/deletestaffraids', { _id: id })
          .then(response => {
            console.log('Staff deleted successfully');
            // Update state after deletion
            setAssignedRaids(prevRaids => prevRaids.filter(raid => raid._id !== id));
            // Display success message
            Swal.fire({
              title: "Deleted!",
              text: "The raid has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error deleting raid:', error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle cancel action
        Swal.fire({
          title: "Cancelled",
          text: "The raid is safe ",
          icon: "error"
        });
      }
    });
  };

  return (
    <Layout>
      <div className="assigned-staff-table">
        <h3>Assigned Raids</h3>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Staff Member"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Raid Type</th>
              <th>Staff Member</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredRaids.length > 0 ? (
              filteredRaids.map(raid => (
                <tr key={raid._id}>
                  <td>{raid.type}</td>
                  <td>{raid.staffmember}</td>
                  <td>{raid.date}</td>
                  <td>{raid.location}</td>
                  <td>{raid.description}</td>
                  <td><button className="edit-button">Edit</button></td>
                  <td><button className="delete-button" onClick={() => handleDelete(raid._id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No raids found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default RaidsAssignTable;
