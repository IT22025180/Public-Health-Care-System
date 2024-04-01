import { useState } from 'react';
import '../styles/FCDocManage.css';
import Layout from '../components/Layout';

const FCDocManage = () => {
  const [reportid, setID] = useState('');
  const [raidOfficer, setRaidOfficer] = useState('');
  const [date, setDate] = useState('');
  const [violatorName, setViolatorName] = useState('');
  const [foodViolation, setfoodViolation] = useState('');
  const [dengueViolation, setdengueViolation] = useState('');
  const [documents, setDocuments] = useState('');


  return (
    <Layout>
      <div className="formContainer">
        <form className="DMForm" onSubmit={''}>
          <h2>Document Management</h2>
          <div>
            <label>Report ID</label>
            <input type="text" name="id" value={reportid} onChange={(e) => setID(e.target.value)} />
          </div>
          <div>
            <label>Raid Officer</label>
            <input type='text' name='raid officer' value={raidOfficer} onChange={(e) => setRaidOfficer(e.target.value)} />
          </div>
          <div>
            <label>Date</label>
            <input type='Date' name='date' value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label>Violator Name</label>
            <input type='text' name='violator name' value={violatorName} onChange={(e) => setViolatorName(e.target.value)} />
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
            <label>Upload Documents</label>
            <input type='file' value={documents} onChange={(e) => setDocuments(e.target.value)} multiple />
          </div>
          <button className='DMbut' type='submit'>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default FCDocManage;
