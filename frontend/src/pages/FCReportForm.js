import React, { useState } from 'react';
import '../styles/FCReportSubmit.css'
import Layout from '../components/Layout';

const FCReportForm = () => {

  
  const [raidOfficerInfo, setRaidOfficerInfo] = useState({
    name: '',
    email: '',
    contactNumber: '',
  });

  const [violationDetails, setViolationDetails] = useState({
    date: '',
    location: '',
    type: '',
    description: '',
  });

  const [violatorInfo, setViolatorInfo] = useState({
    name: '',
    email: '',
    idNumber: '',
  });

  const [evidenceFile, setEvidenceFiles] = useState(null);

  const handleRaidOfficerChange = (e) => {
    const { name, value } = e.target;
    setRaidOfficerInfo({ ...raidOfficerInfo, [name]: value });
  };

  const handleViolationChange = (e) => {
    const { name, value } = e.target;
    setViolationDetails({ ...violationDetails, [name]: value });
  };

  const handleViolatorChange = (e) => {
    const { name, value } = e.target;
    setViolatorInfo({ ...violatorInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvidenceFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., sending data to backend
    console.log('Raid Officer Info:', raidOfficerInfo);
    console.log('Violation Details:', violationDetails);
    console.log('Violator Info:', violatorInfo);
    console.log('Evidence File:', evidenceFile);
  };

  return (
    <Layout>
      <div className="form-container">
        
        <form className='form' onSubmit={handleSubmit}>
         <h2>Report Violation</h2>
          <h3>Raid Officer Information</h3>

          <div className='ROinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={raidOfficerInfo.name} onChange={handleRaidOfficerChange} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={raidOfficerInfo.email} onChange={handleRaidOfficerChange} />
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="Number" name="contactNumber" value={raidOfficerInfo.contactNumber} onChange={handleRaidOfficerChange} />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={violationDetails.date} onChange={handleViolationChange} />
            </div>
          </div>


          <h3>Violation Details</h3>
          <div className='Vdetails'>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={violationDetails.location} onChange={handleViolationChange} />
            </div>
            <div>
              <label>Violation Type:</label>
              <input type="text" name="type" value={violationDetails.type} onChange={handleViolationChange} />
            </div>

            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={violationDetails.description} onChange={handleViolationChange} />
            </div>
          </div>


          <h3>Violator Information</h3>
          <div className='Vinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={violatorInfo.name} onChange={handleViolatorChange} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={violatorInfo.email} onChange={handleViolatorChange} />
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="Number" name="contactNumber" value={violatorInfo.contactNumber} onChange={handleViolatorChange} />
            </div>
            <div>
              <label>ID Number:</label>
              <input type="text" name="idNumber" value={violatorInfo.idNumber} onChange={handleViolatorChange} />
            </div>
          </div>


          <h3>Upload Evidence</h3>
          <div>
            <input type="file" onChange={handleFileChange} multiple />
          </div>
          <button className='button' type="submit">Submit Report</button>
        </form>
      </div>
    </Layout>
  );
};

export default FCReportForm;
