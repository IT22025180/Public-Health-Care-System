import React, { useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import Swal from "sweetalert2";

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
      console.error('Error', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setEvidence(files);
  };

  const handleKeyPress = (e) => {
    // Prevent the default behavior if a number key is pressed
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.key)) {
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
              <input type="text" name="name" value={ROname} onChange={(e) => setROname(e.target.value)} onKeyDown={handleKeyPress} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={Roemail} onChange={(e) => setRoemail(e.target.value)} />
              {errorMessage && <span className="error">{errorMessage}</span>}
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={ROcontact} onChange={(e) => setROcontact(e.target.value)} />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
            </div>
          </div>

          <h4>Violation Details</h4>
          <div className='Vdetails'>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={location} onChange={(e) => setlocation(e.target.value)} onKeyDown={handleKeyPress} />
            </div>
            <div>
              <label>Violation Type:</label>
              <input type="radio" id="foodViolation" name="violationType" value="foodViolation" checked={violationType === 'foodViolation'} onChange={() => setViolationType('foodViolation')} />
              Food Violation
              <span style={{ marginRight: '40px' }}></span>
              <input type="radio" id="dengueViolation" name="violationType" value="dengueViolation" checked={violationType === 'dengueViolation'} onChange={() => setViolationType('dengueViolation')} />
              Dengue Violation
            </div>
            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={description} onChange={(e) => setdescription(e.target.value)} onKeyDown={handleKeyPress} />
            </div>
          </div>

          <h4>Violator Information</h4>
          <div className='Vinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={vName} onChange={(e) => setvName(e.target.value)} onKeyDown={handleKeyPress} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={vEmail} onChange={(e) => setvEmail(e.target.value)} />
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={vContact} onChange={(e) => setvContact(e.target.value)} />
            </div>
            <div>
              <label>NIC Number:</label>
              <input type="text" name="idNumber" value={vId} onChange={(e) => setvId(e.target.value)} />
            </div>
          </div>

          <h4>Upload Evidence</h4>
          <div>
            <input type="file" name="photo" onChange={handleImageChange} multiple />
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
