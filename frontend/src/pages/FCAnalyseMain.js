import { useEffect, useState } from "react";
import '../styles/FCRS.css';
import Layout from '../components/Layout';
import Axios from "axios";
import 'jspdf-autotable';

const FCAnalMain = () => {
  const [RVdata, setRVdata] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = () => {
    Axios.get('http://localhost:4000/api/VioReports')
      .then(response => {
        console.log('Data from Server', response.data);
        setRVdata(response.data.allVioReports);
      })
      .catch(error => {
        console.error('Axios Error : ', error);
      });
  };

  const handleAnalyse = (report) => {
    setSelectedReport(report);
  };

  return (
    <Layout>
      <h2>Report Analyse</h2>
      <div className="stTable">
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Raid Officer Name</th>
              <th>Date</th>
              <th>Violation Location</th>
              <th>Violation Type</th>
              <th>Violation Description</th>
              <th>Violator Name</th>
              <th>Violator Email</th>
              <th>Violator Contact Number</th>
              <th>Violator ID</th>
              <th>Evidences</th>
              <th>Decision</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {RVdata.length > 0 ? (
              RVdata.map((report) => (
                <tr key={report._id}>
                  <td>{report.ro_name}</td>
                  <td>{report.date}</td>
                  <td>{report.v_location}</td>
                  <td>{report.v_type}</td>
                  <td>{report.v_description}</td>
                  <td>{report.v_name}</td>
                  <td>{report.v_email}</td>
                  <td>{report.v_mobile}</td>
                  <td>{report.v_nic}</td>
                  <td>{report.evidence}</td>
                  <td>{report.decision}</td>
                  <td>
                    <button onClick={() => handleAnalyse(report)}>Analyse</button>
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
      {selectedReport && (
        <div className="analyseData">
          Raid Officer Name : {selectedReport.ro_name} <br />
          Date : {selectedReport.date} <br />
          Violation Location : {selectedReport.v_location} <br />
          Violation Type : {selectedReport.v_type} <br />
          Violation Description : {selectedReport.v_description} <br />
          Violator Name : {selectedReport.v_name} <br />
          Violator Email : {selectedReport.v_email} <br />
          Violator Contact Number : {selectedReport.v_mobile} <br />
          Violator ID : {selectedReport.v_nic} <br />
          Evidences : {selectedReport.evidence} <br />
          Decision :
          <span style={{ marginLeft: '20px' }}></span>
          <input type="radio" id="fineViolation" name="decision" value="Fine Only" /> Fine Only
          <span style={{ marginLeft: '20px' }}></span>
          <input type="radio" id="courtAction" name="decision" value="Court Action" /> Court Action
        </div>
      )}
    </Layout>
  );
};

export default FCAnalMain;
