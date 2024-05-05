import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import '../styles/FCNotify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const FCSendEvi = () => {
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
      const { v_name, v_email, date, v_type, evidence } = location.state;
      setName(v_name);
      setemail(v_email);
      setvdate(date);
      setViolationType(v_type);
      setEvidence(evidence);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedDate = new Date(date);

    const serviceID = 'service_0r9kntj';
    const templateID = 'template_hrj18ia';
    const publicKey = 'evKLHFlH0AuDv1opA';

    const templateParams = {
      cNumber: cNumber,
      email: email,
      Vname: Vname,
      vtype: violationType,
      vdate: formattedDate.toLocaleDateString(),
      panelty: panelty,
      policeStation: policeStation,
      date: formattedDate.toLocaleDateString(),
      aname: aname
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
          <input type="number" name="cNumber" value={cNumber} onChange={(e) => setcNumber(e.target.value)} />
          {errors.cNumber && <div className="error">{errors.cNumber}</div>}
        </div>
        <div>
          <label>Court Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} readOnly />
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
            <input type="radio" id="dengueViolation" name="violationType" value="Dengue Violation" checked={violationType === "Dengue Violation"} onChange={(e) => setViolationType(e.target.value)} />
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
                style={{ maxWidth: '400px', maxHeight: '400px', cursor: 'pointer', margin: '10px' }}
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
