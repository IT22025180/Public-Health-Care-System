import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import '../styles/FCNotify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from "axios";

const FCSendEvi = ({ caseId, caseNumber }) => {
  const [email, setemail] = useState('');
  const [Vname, setName] = useState('');
  const [vdate, setvdate] = useState('');
  const [panelty, setPanelty] = useState('');
  const [policeStation, setpoliceStation] = useState('');
  const [date, setdate] = useState('');
  const [aname, setaname] = useState('');
  const [violationType, setViolationType] = useState('');
  const [cNumber, setcNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [evidence, setEvidence] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { v_name, date, v_type } = location.state;
      setName(v_name);
      setvdate(date);
      setViolationType(v_type);
    }

    getReportData();
  }, [location.state, caseId]);

  const getReportData = () => {
    Axios.get('http://localhost:4000/api/VioReports')
      .then(response => {
        console.log('Data from Server', response.data);
        const allReports = response.data.allVioReports;
        const report = allReports.find(report => report._id === caseId);
        if (report) {
          setEvidence(report.evidence);
        } else {
          console.error('Report not found');
        }
      })
      .catch(error => {
        console.error('Axios Error : ', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const formattedDate = new Date(date);
  
    const serviceID = 'service_0r9kntj';
    const templateID = 'template_y83s7pa';
    const publicKey = 'evKLHFlH0AuDv1opA';
  
    const evidenceImages = evidence.map((evidenceItem, index) => {
      return {
        name: `evidence_${index + 1}`,
        data: evidenceItem.data, // Assuming evidence data is already base64 encoded
        contentType: evidenceItem.contentType // Assuming contentType is available
      };
    });
  
    const templateParams = {
      cNumber: cNumber,
      email: email,
      Vname: Vname,
      vtype: violationType,
      vdate: formattedDate.toLocaleDateString(),
      panelty: panelty,
      policeStation: policeStation,
      date: formattedDate.toLocaleDateString(),
      aname: aname,
      evidence: evidenceImages // Include evidence data in template params
    };
  
    emailjs.send(serviceID, templateID, templateParams, publicKey)
  .then((response) => {
    console.log('Email Sent Successfully', response);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Email sent successfully!',
      allowOutsideClick: false,
      confirmButtonText: 'OK'
    }).then(() => {
      if (panelty === "Court Action") {
        navigate('/FCSendEvi');
      } else {
        navigate('/Fine-And-court');
      }
    });
  })
  .catch((error) => {
    console.error('Error sending Email', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while sending the email. Please try again later.',
      allowOutsideClick: false,
      confirmButtonText: 'OK'
    });
  });
}
  

  const validateForm = () => {
    const errors = {};
    if (!cNumber) {
      errors.cNumber = 'Case Number is required';
    } else if (!/^\d+$/.test(cNumber)) {
      errors.cNumber = 'Case Number must contain numbers only';
    }
    if (!panelty) {
      errors.panelty = 'Action is required';
    }
    if (!policeStation) {
      errors.policeStation = 'Police Station is required';
    } else if (!/^[a-zA-Z\s]+$/.test(policeStation)) {
      errors.policeStation = 'Police Station must contain letters only';
    }
    if (!date) {
      errors.date = 'Due Date is required';
    } else if (new Date(date) <= new Date(vdate)) {
      errors.date = 'Due Date must be after Violated Date';
    }
    if (!aname) {
      errors.aname = 'Analyse By is required';
    } else if (!/^[a-zA-Z\s]+$/.test(aname)) {
      errors.aname = 'Analyse By must contain letters only';
    }
    return errors;
  };

  return (
    <div className="form1">
      <form onSubmit={handleSubmit} className="emailForm">
        <h2>Send Evidences</h2>
        <div>
          <label>Case Number:</label>
          <input type="text" name="cNumber" value={caseNumber} readOnly />
        </div>
        <div>
          <label>Court Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
        </div>
        <div>
          <label>Violator Name:</label>
          <input type="text" name="Vname" value={Vname} onChange={(e) => setName(e.target.value)} readOnly />
        </div>
        <div>
          <label>Violation Type:</label>
          <div>
            <input type="radio" id="foodViolation" name="violationType" value="Food Violation" checked={violationType === "Food Violation"} onChange={(e) => setViolationType(e.target.value)} disabled />
            Food Violation
          </div>
          <div>
            <input type="radio" id="dengueViolation" name="violationType" value="Dengue Violation" checked={violationType === "Dengue Violation"} onChange={(e) => setViolationType(e.target.value)} disabled/>
            Dengue Violation
          </div>
        </div>
        <div>
          <label>Violated Date:</label>
          <input type="date" name="vdate" value={vdate} onChange={(e) => setvdate(e.target.value)} readOnly />
        </div>
        <div>
          <label>Evidences:</label>
          {evidence && evidence.length > 0 ? (
            evidence.map((evidenceItem, index) => (
              <img
                key={index}
                src={`data:${evidenceItem.contentType};base64,${evidenceItem.data}`}
                alt={`Evidence ${index + 1}`}
                className="image-container"
              />
            ))
          ) : (
            <span>No evidence available</span>
          )}
        </div>
        <button className='notifyBut' type="submit">Send Email</button>
      </form>
    </div>
  )
}

export default FCSendEvi;
