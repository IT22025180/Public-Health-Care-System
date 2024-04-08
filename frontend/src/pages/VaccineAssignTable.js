import React from 'react';
import Layout from '../components/Layout';
import '../styles/VaccineAssignTable.css'

const DengueAssignTable = () => {
    const assignedStaff = [
        {
          id: 1,
          programType: 'Dengue Prevention Program',
          staffMember: 'Hima',
          date: '2024-04-10',
          location: 'Colombo',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          id: 2,
          programType: 'Dengue Awareness Campaign',
          staffMember: 'Parami',
          date: '2024-04-15',
          location: 'Kandy',
          description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      ];

    return (
        <Layout>
            <div className="assigned-staff-table">
          <h3>Assigned Staff</h3>
          <table>
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
              {assignedStaff.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.programType}</td>
                  <td>{staff.staffMember}</td>
                  <td>{staff.date}</td>
                  <td>{staff.location}</td>
                  <td>{staff.description}</td>
                  <td><button className="edit-button">Edit</button></td>
                  <td><button className="delete-button">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Layout>
        
    );
};

export default DengueAssignTable;
