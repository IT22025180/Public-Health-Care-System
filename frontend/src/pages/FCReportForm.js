import React, { useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import Swal from "sweetalert2";
import * as Yup from 'yup';

const FCReportForm = ({ submitted, data }) => {

  const [ROname, setROname] = useState('');
  const [Roemail, setRoemail] = useState('');
  const [ROcontact, setROcontact] = useState('');
  const [date, setdate] = useState('');
  const [location, setlocation] = useState('');
  const [foodViolation, setFoodViolation] = useState(false);
  const [dengueViolation, setDengueViolation] = useState(false);
  const [description, setdescription] = useState('');
  const [vName, setvName] = useState('');
  const [vEmail, setvEmail] = useState('');
  const [vContact, setvContact] = useState('');
  const [vId, setvId] = useState('');
  const [evidence, setEvidence] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [violationType, setViolationType] = useState('');

  const addFCReport = async () => {
    try {
      await validateSchema.validate({
        ROname,
        Roemail,
        ROcontact,
        location,
        date,
        violationType,
        description,
        vName,
        vEmail,
        vContact,
        vId,
        evidence
      }, { abortEarly: false });

      const formData = new FormData();
      formData.append('ro_name', ROname);
      formData.append('ro_email', Roemail);
      formData.append('ro_mobile', ROcontact);
      formData.append('date', date);
      formData.append('v_location', location);
      formData.append('v_type', foodViolation ? 'Food Violation' : 'Dengue Violation');
      formData.append('v_description', description);
      formData.append('v_name', vName);
      formData.append('v_email', vEmail);
      formData.append('v_mobile', vContact);
      formData.append('v_nic', vId);

      for (let i = 0; i < evidence.length; i++) {
        formData.append("images", evidence[i]);
      }

      await Axios.post('http://localhost:4000/api/addVioR', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Report Submitted Successfully.',
      }).then(() => {
        window.location.href = '/F&CDReportViolationTable';
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          if (err.path === 'evidence') {
            errors[err.path] = err.message;
          } else {
            errors[err.path] = err.message;
            setErrorMessage(errors);
          }
        });
        setErrorMessage(errors);
      } else {
        console.error('Error', error);
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setEvidence(files);
  };

  const validateSchema = Yup.object().shape({
    ROname: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    Roemail: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Gmail address').required('Email is Required'),
    ROcontact: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact number is Required'),
    date: Yup.string()
      .required('Date is Required')
      .test('date', 'Date must be the current date or a past date', function (value) {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        return selectedDate <= currentDate;
      }),
    location: Yup.string().required('Location is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters and numbers'),
    description: Yup.string().required('Description is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Description must contain only letters'),
    vName: Yup.string().required('Name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    vEmail: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Email address').required('Email is Required'),
    vContact: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact Number is Required'),
    vId: Yup.string().required('NIC is required').matches(/^\d{11}(V|v|\d)$/, 'Invalid NIC Number'),
    violationType: Yup.string().required('Violation Type is required'),
    evidence: Yup.array()
      .test('file-size', 'Please upload at most 4 files', (files) => files.length <= 4)
      .test('file-type', 'Only image files are allowed', (files) => files.every((file) => file.type.match(/^image\/(png|jpeg|jpg)$/)))
      .required('Evidence is required'),
  });


  const handleKeyPress = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const contact = (e) => {
    if (e.key === "Backspace") {
      return;
    }
    if (/[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.key)) {
      e.preventDefault();
    }
    if ((e.target.value.length >= 10 && e.key !== "Backspace") || (e.target.value.length === 0 && e.key !== "0")) {
      e.preventDefault();
    }
  }

  const NIC = (e) => {
    if (e.key === "Backspace") {
      return;
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.key)) {
      e.preventDefault();
    }
    if (!/[Vv0-9]/.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.value.length >= 12 && e.key !== "Backspace") {
      e.preventDefault();
    }
  }

  const Address = (e) => {
    if (e.key === "Backspace") {
      return;
    }
    if (!/[A-Za-z0-9,.\-\s]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const Email = (e) => {
    if (e.key === "Backspace") {
      return;
    }
    if (!/[a-zA-Z0-9._%+-@]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <form className='form'>
          <h2>Report Violation</h2>
          <h4>Raid Officer Information</h4>

          <div className='ROinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={ROname} onChange={(e) => setROname(e.target.value)}
                onKeyDown={handleKeyPress} />
              {errorMessage.ROname && <div className="errorMessage">{errorMessage.ROname}</div>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={Roemail} onChange={(e) => setRoemail(e.target.value)}
                onKeyDown={Email} />
              {errorMessage.Roemail && <div className="errorMessage">{errorMessage.Roemail}</div>}
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={ROcontact} onChange={(e) => setROcontact(e.target.value)}
                onKeyDown={contact} />
              {errorMessage.ROcontact && <div className="errorMessage">{errorMessage.ROcontact}</div>}
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
              {errorMessage.date && <div className="errorMessage">{errorMessage.date}</div>}
            </div>
          </div>

          <h4>Violation Details</h4>
          <div className='Vdetails'>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={location} onChange={(e) => setlocation(e.target.value)}
               onKeyDown={Address} />
              {errorMessage.location && <div className="errorMessage">{errorMessage.location}</div>}
            </div>
            <div>
              <label>Violation Type:</label>
              <input type="radio" id="foodViolation" name="violationType" value="foodViolation" checked={violationType === 'foodViolation'} onChange={() => { setFoodViolation(true); setDengueViolation(false); setViolationType('foodViolation'); }} />
              Food Violation
              <span style={{ marginRight: '40px' }}></span>
              <input type="radio" id="dengueViolation" name="violationType" value="dengueViolation" checked={violationType === 'dengueViolation'} onChange={() => { setDengueViolation(true); setFoodViolation(false); setViolationType('dengueViolation'); }} />
              Dengue Violation
              {errorMessage.violationType && <div className="errorMessage">{errorMessage.violationType}</div>}
            </div>
            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={description} onChange={(e) => setdescription(e.target.value)}
               onKeyDown={Address} />
              {errorMessage.description && <div className="errorMessage">{errorMessage.description}</div>}
            </div>
          </div>

          <h4>Violator Information</h4>
          <div className='Vinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={vName} onChange={(e) => setvName(e.target.value)}
               onKeyDown={handleKeyPress} />
              {errorMessage.vName && <div className="errorMessage">{errorMessage.vName}</div>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={vEmail} onChange={(e) => setvEmail(e.target.value)}
                onKeyDown={Email} />
              {errorMessage.vEmail && <div className="errorMessage">{errorMessage.vEmail}</div>}
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={vContact} onChange={(e) => setvContact(e.target.value)}
                onKeyDown={contact} />
              {errorMessage.vContact && <div className="errorMessage">{errorMessage.vContact}</div>}
            </div>
            <div>
              <label>NIC Number:</label>
              <input type="text" name="idNumber" value={vId} onChange={(e) => setvId(e.target.value)}
                onKeyDown={NIC} />
              {errorMessage.vId && <div className="errorMessage">{errorMessage.vId}</div>}
            </div>
          </div>

          <h4>Upload Evidence</h4>
          <div>
            <input type="file" name="photo" onChange={handleImageChange} multiple />
            {errorMessage.evidence && <div className="errorMessage">{errorMessage.evidence}</div>}
          </div>
          <button className="button" type="button" onClick={addFCReport}>
            Submit Report
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default FCReportForm;