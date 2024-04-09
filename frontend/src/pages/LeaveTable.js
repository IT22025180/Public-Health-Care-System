import React, { useEffect, useState } from 'react';
import '../styles/LeaveTable.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const LeaveTable = () => {

    const navigate = useNavigate();

    /*const editleave = () => {
        navigate('/EditLeave')
      }*/

    
    const [leavedata, setleavedata] = useState([]);

    useEffect(() => {
        getleavedata();
    }, []);

    const getleavedata = () => {
        Axios.get('http://localhost:4000/api/Leave')
            .then(response => {
                console.log('data from server', response.data);
                setleavedata(response.data.allLeave);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    };


    const handleEdit = (id) => {
        navigate(`/EditLeave/${id}`); 
    };

    const handleDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteLeave', { _id: id })
            .then(response => {
                console.log('Leave deleted successfully');
                setleavedata(prevData => prevData.filter(leave => leave._id !== id));
            })
            .catch(error => {
                console.error('Error deleting leave:', error);
            });
    };

    return (
        <Layout>
            <div className='LeaveTable'>
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
                        <th>Delete</th> {/* Separate column for delete button */}
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
                                    <button className="editButton" onClick={(editleave) => handleEdit(leave._id)}>Edit</button>
                                </td>
                                <td className='actionButtons'> 
                                    <button className="deleteButton" onClick={() => handleDelete(leave._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">You have no leave data</td> {/* Colspan increased to accommodate the additional column */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </Layout>
    );
};

export default LeaveTable;
