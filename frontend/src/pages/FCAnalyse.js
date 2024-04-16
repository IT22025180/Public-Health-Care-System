import React, { useEffect, useState } from "react";
import '../styles/FCRS.css';
import Layout from '../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from "react-router-dom";

const FCRS = () => {
  const [RVdata, setRVdata] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [decision, setDecision] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openImageModal = (imageData) => {
    setSelectedImage(imageData);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  return (
    <Layout>
      <h2>Violation Report Status</h2>
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
              <th>Violator NIC</th>
              <th>Decision</th>
              <th>Analyse</th>
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
                  <td>{report.decision || 'Pending'}</td>
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
            <strong>Evidences :</strong> <br />
            {selectedReport.evidence && selectedReport.evidence.length > 0 ? (
              selectedReport.evidence.map((evidence, index) => (
                <img
                  key={index}
                  src={`data:${evidence.contentType};base64,${evidence.data}`}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: '400px', maxHeight: '400px', cursor: 'pointer' }}
                  onClick={() => openImageModal(evidence)}
                />
              ))
            ) : (
              <span>No evidence</span>
            )}
            <br />
            <strong>Decision :</strong>
            <input type="radio" id="fineViolation" name="decision" value="Fine Only" onChange={() => setDecision("Fine Only")} /> Fine Only
            <input type="radio" id="courtAction" name="decision" value="Court Action" onChange={() => setDecision("Court Action")} /> Court Action
            <div className="subBtn">
              <button onClick={handleDecisionSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
      {showImageModal && selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeImageModal}>&times;</span>
            <img src={`data:${selectedImage.contentType};base64,${selectedImage.data}`} alt="Full size" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FCRS;
