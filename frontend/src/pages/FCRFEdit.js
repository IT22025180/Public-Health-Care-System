import React, { useEffect, useState } from 'react';
import '../styles/FCReportSubmit.css';
import Layout from '../components/Layout';
import Axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';

const FCRFEdit = () => {

  const { _id, ro_name, ro_email, ro_mobile, date, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email } = useParams();
  const [ROname_u, setROname] = useState(ro_name);
  const [Roemail_u, setRoemail] = useState(ro_email);
  const [ROcontact_u, setROcontact] = useState(ro_mobile);
  const [date_u, setdate] = useState(date);
  const [location_u, setlocation] = useState(v_location);
  const [foodViolation_u, setFoodViolation] = useState(false);
  const [dengueViolation_u, setDengueViolation] = useState(false);
  const [description_u, setdescription] = useState(v_description);
  const [vName_u, setvName] = useState(v_name);
  const [vEmail_u, setvEmail] = useState(v_email);
  const [vContact_u, setvContact] = useState(v_mobile);
  const [vId_u, setvId] = useState(v_nic);
  const [violationType_u, setViolationType] = useState(
    v_type === 'Food Violation' ? 'foodViolation' : 'dengueViolation'
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (v_type === 'Food Violation') {
      setFoodViolation(true);
      setDengueViolation(false);
      setViolationType('foodViolation');
    } else if (v_type === 'Dengue Violation') {
      setDengueViolation(true);
      setFoodViolation(false);
      setViolationType('dengueViolation');
    }
  }, [v_type]);

  const updateForm = async (_id, ro_name, ro_email, ro_mobile, date, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email) => {
    try {
      const response = await Axios.post('http://localhost:4000/api/updateVioR', {
        _id: _id,
        ro_name,
        ro_email,
        ro_mobile,
        date,
        v_location,
        v_type,
        v_description,
        v_name,
        v_nic,
        v_nic,
        v_mobile,
        v_email,
      });
      console.log("Form Update successfully", response.data);
      return response;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  const uForm = async () => {
    try {
      const violationTypeValue = foodViolation_u ? 'Food Violation' : dengueViolation_u ? 'Dengue Violation' : '';

      await updateForm(_id, ROname_u, Roemail_u, ROcontact_u, date_u, location_u, description_u, vName_u, vEmail_u, vContact_u, vId_u, violationTypeValue);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Document Data Update Successfully.',
      }).then(() => {
        navigate('/F&CDocumentManagementTabe');
      });
    } catch (error) {
      console.error("Error", error);
    }
  }

  const handleViolationTypeChange = (type) => {
    if (type === 'foodViolation') {
      setFoodViolation(true);
      setDengueViolation(false);
      setViolationType('foodViolation');
    } else if (type === 'dengueViolation') {
      setDengueViolation(true);
      setFoodViolation(false);
      setViolationType('dengueViolation');
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
              <input type="text" name="name" value={ROname_u} onChange={(e) => setROname(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={Roemail_u} onChange={(e) => setRoemail(e.target.value)} />
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={ROcontact_u} onChange={(e) => setROcontact(e.target.value)} />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={date_u} onChange={(e) => setdate(e.target.value)} />
            </div>
          </div>
          <h4>Violation Details</h4>
          <div className='Vdetails'>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={location_u} onChange={(e) => setlocation(e.target.value)} />
            </div>
            <div>
              <label>Violation Type:</label>
              <input type="radio" id="foodViolation" name="violationType" value="foodViolation" checked={violationType_u === 'foodViolation'} onChange={() => handleViolationTypeChange('foodViolation')} />
              Food Violation
              <span style={{ marginRight: '40px' }}></span>
              <input type="radio" id="dengueViolation" name="violationType" value="dengueViolation" checked={violationType_u === 'dengueViolation'} onChange={() => handleViolationTypeChange('dengueViolation')} />
              Dengue Violation
            </div>
            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={description_u} onChange={(e) => setdescription(e.target.value)} />
            </div>
          </div>
          <h4>Violator Information</h4>
          <div className='Vinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={vName_u} onChange={(e) => setvName(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={vEmail_u} onChange={(e) => setvEmail(e.target.value)} />
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={vContact_u} onChange={(e) => setvContact(e.target.value)} />
            </div>
            <div>
              <label>NIC Number:</label>
              <input type="text" name="idNumber" value={vId_u} onChange={(e) => setvId(e.target.value)} />
            </div>
          </div>
          <button className="upbutton" type="button" onClick={uForm}>
            Update Report
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default FCRFEdit;
