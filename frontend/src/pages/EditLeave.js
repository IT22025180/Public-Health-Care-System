import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const EditLeave = () => {
    const { id } = useParams(); // Get the leave ID from the URL params
    const [leave, setLeave] = useState({
        name: '',
        staffid: '',
        email: '',
        position: '',
        doleave: '',
        leavestrt: '',
        leaveend: '',
        leaveType: ''
    });

    useEffect(() => {
        // Fetch leave details from the backend based on the ID
        Axios.get(`http://localhost:4000/api/Leave/${id}`)
            .then(response => {
                setLeave(response.data); // Update state with leave details
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send updated leave details to the backend
        Axios.put(`http://localhost:4000/api/Leave/${id}`, leave)
            .then(response => {
                console.log('Leave updated successfully');
                // Redirect to leave table or another page after update
            })
            .catch(error => {
                console.error('Error updating leave:', error);
            });
    };

    return (
        <Layout>
            <div>
                <h2>Edit Leave</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" name="name" value={leave.name} onChange={handleChange} />
                    <label>Staff ID:</label>
                    <input type="text" name="staffid" value={leave.staffid} onChange={handleChange} />
                    <label>Email:</label>
                    <input type="email" name="email" value={leave.email} onChange={handleChange} />
                    <label>Position:</label>
                    <input type="text" name="position" value={leave.position} onChange={handleChange} />
                    <label>Leaves For:</label>
                    <input type="text" name="doleave" value={leave.doleave} onChange={handleChange} />
                    <label>Leave Start:</label>
                    <input type="date" name="leavestrt" value={leave.leavestrt} onChange={handleChange} />
                    <label>Leave End:</label>
                    <input type="date" name="leaveend" value={leave.leaveend} onChange={handleChange} />
                    <label>Leave Type:</label>
                    <input type="text" name="leaveType" value={leave.leaveType} onChange={handleChange} />

                    <button type="submit">Update</button>
                </form>
            </div>
        </Layout>
    );
};

export default EditLeave;
