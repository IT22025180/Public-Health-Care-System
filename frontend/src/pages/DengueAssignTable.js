// AssignedStaffPage.jsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';

const AssignedStaffPage = () => {
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    getCampData();
  }, []);

  const getCampData = () => {
    Axios.get('http://localhost:4000/api/getstaffdengue') // Use the same endpoint as in Dengueschedules component
      .then(response => {
        console.log('data from server', response.data);
        setCampData(response.data.allCampaign);
      })
      .catch(error => {
        console.error("Axios error:", error);
      });
  };

  return (
    <Layout>
      <div className='AssignedStaffTable'>
        <h2>Assigned Staff for Each Camp</h2>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Camp ID</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Conducted By</th>
              <th>Assigned Staff</th>
            </tr>
          </thead>
          <tbody>
            {campData.map((camp) => (
              <tr key={camp._id}>
                <td>{camp._id}</td>
                <td>{camp.venue}</td>
                <td>{camp.date}</td>
                <td>{camp.time}</td>
                <td>{camp.drName}</td>
                <td>{camp.assignedStaff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AssignedStaffPage;
