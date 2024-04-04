import { useState } from 'react';
import '../styles/FCDocManage.css';
import Layout from '../components/Layout';
import Axios from "axios";

const FCDocManage = () => {
  const [Docs, setDocs] = useState([]);
  const [reportid, setID] = useState('');
  const [raidOfficer, setRaidOfficer] = useState('');
  const [date, setDate] = useState('');
  const [violatorName, setViolatorName] = useState('');
  const [foodViolation, setfoodViolation] = useState('');
  const [dengueViolation, setdengueViolation] = useState('');
  const [documents, setDocuments] = useState('');
  const [subbmited, setSubbmted] = useState(false);


  const addDoc = (data) => {
    setSubbmted(true);

    const payload ={
      r_id: data.r_id,
      ro_name: data.ro_name,
      date: data.date,
      v_name: data.v_name,
      v_type: data.v_type,
      documents: data.documents,
    }

    Axios.post('https://localhost:4000/api/addDocM', payload)
      .then(() => {
        setSubbmted(false)       
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const getFCDocManage = () => {
    Axios.post('https://localhost:4000/api/addDocM', payload)
      .then(() => {
        setDocs(response.data?.response || []);        
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }


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
              <input type="radio" id="foodViolation" name="type" value={foodViolation} onChange={(e) => setfoodViolation(e.target.value)} />
              Food Violation   
              <span style={{ marginRight: '40px' }}></span>
              <input type="radio" id="dengueViolation" name="type" value={dengueViolation} onChange={(e) => setdengueViolation(e.target.value)} />
              Dengue Violation
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
