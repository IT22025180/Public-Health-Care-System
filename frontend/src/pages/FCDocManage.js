import { useEffect, useState } from 'react';
import '../styles/FCDocManage.css';
import Layout from '../components/Layout';
import Axios from "axios";

const FCDocManage = ({ submitted, data }) => {
  
  const [reportid, setID] = useState('');
  const [raidOfficer, setRaidOfficer] = useState('');
  const [date, setDate] = useState('');
  const [violatorName, setViolatorName] = useState('');
  const [foodViolation, setFoodViolation] = useState(false);
  const [dengueViolation, setDengueViolation] = useState(false);
  const [documents, setDocuments] = useState('');

  useEffect(() => {
    if (!submitted) {
      setID('');
      setRaidOfficer('');
      setDate('');
      setViolatorName('');
      setFoodViolation(false);
      setDengueViolation(false);
      setDocuments('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setID(data.id);
      setRaidOfficer(data.raidOfficer);
      setDate(data.date);
      setViolatorName(data.violatorName);
      setFoodViolation(data.foodViolation);
      setDengueViolation(data.dengueViolation);
      setDocuments(data.documents);
    }
  }, [data]);

  const addDocm = async () => {
    try {
      const response = await Axios.post('http://localhost:4000/api/addDocM', {
        r_id: reportid,
        ro_name: raidOfficer,
        date: date,
        v_name: violatorName,
        v_type: foodViolation ? 'Food Violation' : 'Dengue Violation',
        documents: documents,
      });
      console.log('Successful', response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Layout>
      <div className="formContainer">
        <form className="DMForm">
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
            <input type="radio" id="foodViolation" name="type" value='foodViolation' checked={foodViolation} onChange={() => { setFoodViolation(true); setDengueViolation(false); }} />
            Food Violation
            <span style={{ marginRight: '40px' }}></span>
            <input type="radio" id="dengueViolation" name="type" value='dengueViolation' checked={dengueViolation} onChange={() => { setDengueViolation(true); setFoodViolation(false); }} />
            Dengue Violation
          </div>

          <div>
            <label>Upload Documents</label>
            <input type='file' value={documents} onChange={(e) => setDocuments(e.target.value)} multiple />
          </div>
          <button className='DMbut' type='submit' onClick={addDocm}>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default FCDocManage;
