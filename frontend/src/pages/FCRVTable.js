import { useEffect, useState } from "react";
import '../styles/FCRVTable.css'
import Axios from "axios";

const FCRVTable = () => {

  const [RVdata, setRVdata] = useState([]);

  useEffect(() => {
    getReportData();
  }, [] );

  const getReportData = () => {
    Axios.get('http://localhost:4000/api/VioReports')
    .then(response => {
      console.log('Data from Server', response.data);
      setRVdata(response.data.allVioReports)
    })
    .catch(error =>{
      console.error('Axios Error : ', error)
    })
  }

  const deletereport = (id) => {
    Axios.post('http://localhost:4000/api/deleteVioR',{_id: id})
    .then(response => {
      console.log('Document delete successfully');
      setRVdata(prevData => prevData.filter(RVdata => RVdata._id !== id));
    })
    .catch(error => {
      console.error('Error Delete Document', error)
    });
  }
  

  return (
    <div className="FCRVTable">
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Raid Officer Name</th>
            <th>Raid Officer Email </th>
            <th>Raid Officer Contact Number</th>
            <th>Date</th>
            <th>Violation Location</th>
            <th>Violation Type</th>
            <th>Violation Description</th>
            <th>Violator Name</th>
            <th>Violator Email</th>
            <th>Violator Contact Number</th>
            <th>Violator ID</th>
            <th>Evidances</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {RVdata && RVdata.length > 0 ? (
            RVdata.map((RVdata) => (
              <tr key={RVdata._id}>
                <td>{RVdata.ro_name}</td>
                <td>{RVdata.ro_email}</td>
                <td>{RVdata.ro_mobile}</td>
                <td>{RVdata.date}</td>
                <td>{RVdata.v_location}</td>
                <td>{RVdata.v_type}</td>
                <td>{RVdata.v_description}</td>
                <td>{RVdata.v_name}</td>
                <td>{RVdata.v_email}</td>
                <td>{RVdata.v_mobile}</td>
                <td>{RVdata.v_nic}</td>
                <td>{RVdata.evidence}</td> 
                <td>
                  <button className="rvedtBtn">Edit</button>
                </td>
                <td>
                  <button className="rvdeleteBtn" onClick={() => deletereport(RVdata._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FCRVTable;
