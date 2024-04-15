import { useEffect, useState } from "react";
import '../styles/FCRS.css';
import Layout from '../components/Layout';
import Axios from "axios";
import 'jspdf-autotable';

const FCAnalMain = () => {
  const [RVdata, setRVdata] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [decision, setDecision] = useState("");

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = () => {
    
    Axios.get('http://localhost:4000/api/VioReports', {
      params: {
        decision: "pending"
      }
    })
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

  const handleDecisionSubmit = () => {
    if (selectedReport) {
      const updatedReport = { ...selectedReport, decision };
      Axios.post(`http://localhost:4000/api/updateVioR`, updatedReport)
        .then(response => {
          console.log('Decision updated successfully:', response.data);
          const updatedRVdata = RVdata.map(report =>
            report._id === selectedReport._id ? { ...report, decision } : report
          );
          setRVdata(updatedRVdata);
        })
        .catch(error => {
          console.error('Error updating decision:', error);
        });
    }
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
              <th>Violator NIC Number</th>
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
        <div className="analyseDataBox">
          <div className="analyseData">
            <strong>Raid Officer Name :</strong> {selectedReport.ro_name} <br />
            <strong>Date :</strong> {selectedReport.date} <br />
            <strong>Violation Location :</strong> {selectedReport.v_location} <br />
            <strong>Violation Type :</strong> {selectedReport.v_type} <br />
            <strong>Violation Description :</strong> {selectedReport.v_description} <br />
            <strong>Violator Name :</strong> {selectedReport.v_name} <br />
            <strong>Violator Email :</strong> {selectedReport.v_email} <br />
            <strong>Violator Contact Number :</strong> {selectedReport.v_mobile} <br />
            <strong>Violator NIC Number :</strong> {selectedReport.v_nic} <br />
            <strong>Evidences :</strong> {selectedReport.evidence} <br />
            <strong>Decision :</strong>
            <input type="radio" id="fineViolation" name="decision" value="Fine Only" onChange={() => setDecision("Fine Only")} /> Fine Only
            <input type="radio" id="courtAction" name="decision" value="Court Action" onChange={() => setDecision("Court Action")} /> Court Action
            <div className="subBtn">
              <button onClick={handleDecisionSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FCAnalMain;
