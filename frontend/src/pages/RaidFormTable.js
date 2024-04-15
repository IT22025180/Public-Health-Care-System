import React, { useEffect, useState } from 'react';
import '../styles/RaidFormTable.css';
import Layout from '../components/Layout';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const RaidFormTable = () => {
    const [formtabledata, setFormTableData] = useState([]);

    useEffect(() => {
        getFormTableData();
    }, []);

    const getFormTableData = () => {
        Axios.get('http://localhost:4000/api/raidForm')
            .then(response => {
                console.log('Data from server:', response.data);
                setFormTableData(response.data.allRF);
            })
            .catch(error => {
                console.error("Axios error:", error);
            });
    };

    const deleteFormTableData = (id) => {
        Axios.post('http://localhost:4000/api/deleteRF', { _id: id })
            .then(response => {
                console.log('Table Data deleted successfully');
                setFormTableData(prevData => prevData.filter(formtable => formtable._id !== id));
            })
            .catch(error => {
                console.error('Error deleting form table data:', error);
            });
    };

    return (
        <Layout>|
            <h2>Raid Form Table</h2>
            <div className='FormtableTab'>
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Officer</th>
                            <th>Special Notes</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formtabledata && formtabledata.length > 0 ? (
                            formtabledata.map((formtable) => (
                                <tr key={formtable._id}>
                                    <td>{formtable.location}</td>
                                    <td>{formtable.date}</td>
                                    <td>{formtable.time}</td>
                                    <td>{formtable.officer}</td>
                                    <td>{formtable.sNote}</td>
                                    <td className='actionButtons'>
                                        <Link to ={`/RaidFormEdit/${formtable._id}/${formtable.location}/${formtable.date}/${formtable.time}/${formtable.officer}/${formtable.sNote}`}>
                                        <button>Edit</button>
                                        </Link>
                                    </td>
                                    <td onClick={() => deleteFormTableData(formtable._id)} className='deleteButtons'>
                                        <button>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7"><centr>You have not added any Raid Data</centr></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default RaidFormTable;
