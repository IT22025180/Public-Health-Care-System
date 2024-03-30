import { useState } from 'react';
import './FCDocManage.css';

const FCDocManage = () => {
  const [reportid, setID] = useState('');
  const [raidOfficer, setRaidOfficer] = useState('');
  const [date, setDate] = useState('');
  const [violatorName, setViolatorName] = useState('');
  const [violationType, setViolationType] = useState('');
  const [documents, setDocuments] = useState('');


  return (
    <div className="formContainer">
      <h2>Document Management</h2>

      <form className="DMForm" onSubmit={''}>
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
          <label>Violation Type</label>
          <input type='text' name='violation type' value={violationType} onChange={(e) => setViolationType(e.target.value)} />
        </div>
        <div>
          <label>Upload Documents</label>
          <input type='file' value={documents} onChange={(e) => setDocuments(e.target.value)} multiple />
        </div>
        <button className='DMbut' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default FCDocManage;
