import React, { useEffect, useState } from 'react';
import '../styles/FCReportSubmit.css'
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
  const [evidenceFile, setEvidenceFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  const [violationType, setViolationType] = useState('');

  useEffect(() => {
    if (!submitted) {
      setROname('');
      setRoemail('');
      setROcontact('');
      setdate('');
      setlocation('');
      setFoodViolation(false);
      setDengueViolation(false);
      setdescription('');
      setvName('');
      setvEmail('');
      setvContact('');
      setvId('');
      setEvidenceFile(null);
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setROname(data.ROname);
      setRoemail(data.Roemail);
      setROcontact(data.ROcontact);
      setdate(data.date);
      setlocation(data.location);
      setFoodViolation(data.foodViolation);
      setDengueViolation(data.dengueViolation);
      setdescription(data.description);
      setvName(data.vName);
      setvEmail(data.vEmail);
      setvContact(data.vContact);
      setvId(data.vId);
    }
  }, [data]);

  const validateSchema = Yup.object().shape({
    ROname: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    Roemail: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Gmail address').required('Email is Required'),
    ROcontact: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact number is Required'),
    date: Yup.date().required('Date is Required'),
    location: Yup.string().required('Location is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters'),
    description: Yup.string().required('Description is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Description must contain only letters'),
    vName: Yup.string().required('Name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    vEmail: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Gmail address').required('Email is Required'),
    vContact: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact Number is Required'),
    vId: Yup.string().required('NIC is required').matches(/^\d{11}(V|v|\d)$/, 'Invalid NIC Number'),
    violationType: Yup.string().required('Violation Type is required').oneOf(['foodViolation', 'dengueViolation'], 'Invalid Violation Type')
  })

  const addFCReport = async () => {
    try {
      await validateSchema.validate(
        {
          ROname,
          Roemail,
          ROcontact,
          date,
          location,
          description,
          vName,
          vEmail,
          vContact,
          vId,
          evidenceFile,
          violationType
        },
        { abortEarly: false }
      );
      const formData = new FormData();
      formData.append('ro_name', ROname);
      formData.append('ro_email', Roemail);
      formData.append('ro_mobile', ROcontact);
      formData.append('date', date);
      formData.append('v_location', location);
      formData.append('v_type', foodViolation ? 'foodViolation' : 'dengueViolation');
      formData.append('v_description', description);
      formData.append('v_name', vName);
      formData.append('v_email', vEmail);
      formData.append('v_mobile', vContact);
      formData.append('v_nic', vId);
      formData.append('evidence', evidenceFile);

      const response = await Axios.post('http://localhost:4000/api/addVioR', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Report Submitted Successfully.',
      }).then(() => {
        window.location.href = '/F&CDReportViolationTabe';
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      } else {
        console.error('Error', error);
      }
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
              <input type="text" name="name" value={ROname} onChange={(e) => setROname(e.target.value)} />
              {errorMessage.ROname && <div className="errorMessage">{errorMessage.ROname}</div>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={Roemail} onChange={(e) => setRoemail(e.target.value)} />
              {errorMessage.Roemail && <div className="errorMessage">{errorMessage.Roemail}</div>}
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="Number" name="contactNumber" value={ROcontact} onChange={(e) => setROcontact(e.target.value)} />
              {errorMessage.ROcontact && <div className="errorMessage">{errorMessage.ROcontact}</div>}
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
              {errorMessage.date && date === '' && <div className="errorMessage">Invalid Date</div>}
            </div>
          </div>


          <h4>Violation Details</h4>
          <div className='Vdetails'>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={location} onChange={(e) => setlocation(e.target.value)} />
              {errorMessage.location && <div className="errorMessage">{errorMessage.location}</div>}
            </div>
            <div>
              <label>Violation Type:</label>
              <input type="radio" id="foodViolation" name="violationType" value="foodViolation" checked={violationType === 'foodViolation'} onChange={() => setViolationType('foodViolation')} />
              Food Violation
              <span style={{ marginRight: '40px' }}></span>
              <input type="radio" id="dengueViolation" name="violationType" value="dengueViolation" checked={violationType === 'dengueViolation'} onChange={() => setViolationType('dengueViolation')} />
              Dengue Violation
              {errorMessage.violationType && <div className="errorMessage">{errorMessage.violationType}</div>}
            </div>

            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={description} onChange={(e) => setdescription(e.target.value)} />
              {errorMessage.description && <div className="errorMessage">{errorMessage.description}</div>}
            </div>
          </div>


          <h4>Violator Information</h4>
          <div className='Vinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={vName} onChange={(e) => setvName(e.target.value)} />
              {errorMessage.vName && <div className="errorMessage">{errorMessage.vName}</div>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={vEmail} onChange={(e) => setvEmail(e.target.value)} />
              {errorMessage.vEmail && <div className="errorMessage">{errorMessage.vEmail}</div>}
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="Number" name="contactNumber" value={vContact} onChange={(e) => setvContact(e.target.value)} />
              {errorMessage.vContact && <div className="errorMessage">{errorMessage.vContact}</div>}
            </div>
            <div>
              <label>ID Number:</label>
              <input type="Number" name="idNumber" value={vId} onChange={(e) => setvId(e.target.value)} />
              {errorMessage.vId && <div className="errorMessage">{errorMessage.vId}</div>}
            </div>
          </div>


          <h4>Upload Evidence</h4>
          <div>
          <input type="file" onChange={(e) => setEvidenceFile(e.target.files[0])} />
          </div>
          <button className="button" type="button" onClick={addFCReport}>
            Submit Report
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default FCReportForm;