import React, { useState } from 'react';
import '../styles/FCReportSubmit.css'
import Layout from '../components/Layout';

const FCReportForm = () => {

  const [ROname, setROname] = useState('')
  const [Roemail, setRoemail] = useState('')
  const [ROcontact, setROcontact] = useState('')
  const [date, setdate] = useState('')
  const [location, setlocation] = useState('')
  const [foodViolation, setfoodViolation] = useState('')
  const [dengueViolation, setdengueViolation] = useState('')
  const [description, setdescription] = useState('')
  const [vName, setvName] = useState('')
  const [vEmail, setvEmail] = useState('')
  const [vContact, setvContact] = useState('')
  const [vId, setvId] = useState('')
  const [document, setdocument] = useState('')

  return (
    <Layout>
      <div className="form-container">

        <form className='form' onSubmit={''}>
          <h2>Report Violation</h2>
          <h3>Raid Officer Information</h3>

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


          <h3>Violation Details</h3>
          <div className='Vdetails'>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={location} onChange={(e) => setlocation(e.target.value)} />
            </div>
            <div>
              <label>Violation Type:</label>
              <div>
                <input type="radio" id="foodViolation" name="type" value={foodViolation} onChange={(e) => setfoodViolation(e.target.value)} />
                Food Violation
              </div>
              <div>
                <input type="radio" id="dengueViolation" name="type" value={dengueViolation} onChange={(e) => setdengueViolation(e.target.value)} />
                Dengue Violation
              </div>
            </div>

            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={description} onChange={(e) => setdescription(e.target.value)} />
            </div>
          </div>


          <h3>Violator Information</h3>
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


          <h3>Upload Evidence</h3>
          <div>
            <input type="file" value={document} onChange={(e) => setdocument(e.target.value)} multiple />
          </div>
          <button className='button' type="submit">Submit Report</button>
        </form>
      </div>
    </Layout>
  );
};

export default FCReportForm;
