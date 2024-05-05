import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import '../styles/FCNotify.css';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';

const FCNotify = () => {
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { v_name, v_email, date, v_type } = location.state;
      setName(v_name);
      setemail(v_email);
      setvdate(date);
      setViolationType(v_type);
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
          navigate('/Fine-And-court');
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
    <Layout>
      <div className="form1">
        <form onSubmit={handleSubmit} className="emailForm">
          <h2>Notify Violator</h2>
          <div>
            <label>Case Number:</label>
            <input type="number" name="cNumber" value={cNumber} onChange={(e) => setcNumber(e.target.value)} />
            {errors.cNumber && <div className="error">{errors.cNumber}</div>}
          </div>
          <div>
            <label>Email:</label>
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
            <label>Action:</label>
            <div>
              <input type="radio" id="fineOnly" name="panelty" value="Fine only" checked={panelty === "Fine only"} onChange={(e) => setPanelty(e.target.value)} />
              Fine only
            </div>
            <div>
              <input type="radio" id="courtAction" name="panelty" value="Court Action" checked={panelty === "Court Action"} onChange={(e) => setPanelty(e.target.value)} />
              Court Action
            </div>
            {errors.panelty && <div className="error">{errors.panelty}</div>}
          </div>
          <div>
            <label>Police Station:</label>
            <input type="text" name="policeStation" value={policeStation} onChange={(e) => setpoliceStation(e.target.value)} />
            {errors.policeStation && <div className="error">{errors.policeStation}</div>}
          </div>
          <div>
            <label>Due Date:</label>
            <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
            {errors.date && <div className="error">{errors.date}</div>}
          </div>
          <div>
            <label>Analyse By:</label>
            <input type="text" name="aname" value={aname} onChange={(e) => setaname(e.target.value)} />
            {errors.aname && <div className="error">{errors.aname}</div>}
          </div>
          <button className='notifyBut' type="submit">Send Email</button>
        </form>
      </div>
    </Layout>
  )
}

export default FCNotify;
