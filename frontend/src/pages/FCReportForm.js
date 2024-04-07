import React, { useEffect, useState } from 'react';
import '../styles/FCReportSubmit.css'
import Layout from '../components/Layout';
import Axios from 'axios';

const FCReportForm = ({ submitted, data }) => {

  const [ROname, setROname] = useState('')
  const [Roemail, setRoemail] = useState('')
  const [ROcontact, setROcontact] = useState('')
  const [date, setdate] = useState('')
  const [location, setlocation] = useState('')
  const [foodViolation, setFoodViolation] = useState('')
  const [dengueViolation, setDengueViolation] = useState('')
  const [description, setdescription] = useState('')
  const [vName, setvName] = useState('')
  const [vEmail, setvEmail] = useState('')
  const [vContact, setvContact] = useState('')
  const [vId, setvId] = useState('')
  const [document, setdocument] = useState('')

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
      setdocument('');
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
      setdocument(data.document);
    }
  }, [data]);

  const addFCReport = async () => {
    try {
      const response = await Axios.post('http://localhost:4000/api/addVioR', {
        ro_name: ROname,
        ro_email: Roemail,
        ro_mobile: ROcontact,
        date: date,
        v_location: location,
        v_type: foodViolation ? 'foodViolation' : 'dengueViolation',
        v_description: description,
        v_name: vName,
        v_nic: vId,
        v_mobile: vContact,
        v_email: vEmail,
        evidance: document,
      });
      console.log('Successful', response.data);
    } catch (error) {
      console.error('Error', error);
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
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={Roemail} onChange={(e) => setRoemail(e.target.value)} />
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="Number" name="contactNumber" value={ROcontact} onChange={(e) => setROcontact(e.target.value)} />
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
              <input type="text" name="location" value={location} onChange={(e) => setlocation(e.target.value)} />
            </div>
            <div>
              <label>Violation Type:</label>
              <input type="radio" id="foodViolation" name="type" value='foodViolation' checked={foodViolation} onChange={() => { setFoodViolation(true); setDengueViolation(false); }} />
              Food Violation
              <span style={{ marginRight: '40px' }}></span>
              <input type="radio" id="dengueViolation" name="type" value='dengueViolation' checked={dengueViolation} onChange={() => { setDengueViolation(true); setFoodViolation(false); }} />
              Dengue Violation
            </div>

            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={description} onChange={(e) => setdescription(e.target.value)} />
            </div>
          </div>


          <h4>Violator Information</h4>
          <div className='Vinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={vName} onChange={(e) => setvName(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={vEmail} onChange={(e) => setvEmail(e.target.value)} />
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="Number" name="contactNumber" value={vContact} onChange={(e) => setvContact(e.target.value)} />
            </div>
            <div>
              <label>ID Number:</label>
              <input type="Number" name="idNumber" value={vId} onChange={(e) => setvId(e.target.value)} />
            </div>
          </div>


          <h4>Upload Evidence</h4>
          <div>
            <input type="file" value={document} onChange={(e) => setdocument(e.target.value)} multiple />
          </div>
          <button className='button' type="button" onChange={addFCReport}>Submit Report</button>
        </form>
      </div>
    </Layout>
  );
};

export default FCReportForm;
