// DengueAssignTable.jsx
import React from 'react';

const DengueAssignTable = ({ campData }) => {
  return (
    <div className='DengueAssignTable'>
      <h2>Dengue Assignments</h2>
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
  );
};

export default DengueAssignTable;
