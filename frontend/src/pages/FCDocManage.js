import { useEffect, useState } from 'react';
import '../styles/FCDocManage.css';
import Layout from '../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import * as Yup from 'yup';

const FCDocManage = ({ submitted, data }) => {
  const [reportid, setID] = useState('');
  const [raidOfficer, setRaidOfficer] = useState('');
  const [date, setDate] = useState('');
  const [violatorName, setViolatorName] = useState('');
  const [foodViolation, setFoodViolation] = useState(false);
  const [dengueViolation, setDengueViolation] = useState(false);
  const [documents, setDocuments] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const validateSchema = Yup.object().shape({
    reportid: Yup.string().required('Report ID is required').matches(/^[A-Za-z0-9]+$/, 'Report ID must contain only letters and numbers'),
    raidOfficer: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    date: Yup.date().required('Date is required'),
    violatorName: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    documents: Yup.mixed().required('Documents required'),
  });

  const addDocm = async () => {
    try {
      await validateSchema.validate({
        reportid,
        raidOfficer,
        date,
        violatorName,
        documents,
      }, { abortEarly: false });

      await Axios.post('http://localhost:4000/api/addDocM', {
        r_id: reportid,
        ro_name: raidOfficer,
        date: date,
        v_name: violatorName,
        v_type: foodViolation ? 'Food Violation' : 'Dengue Violation',
        documents: documents,
      });
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Document added successfully.',
      }).then(() => {
        window.location.href = '/F&CDocumentManagementTabe';
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      }
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
            {errorMessage.reportid && <div className="errorMessage">{errorMessage.reportid}</div>}
          </div>
          <div>
            <label>Raid Officer</label>
            <input type='text' name='raid officer' value={raidOfficer} onChange={(e) => setRaidOfficer(e.target.value)} />
            {errorMessage.raidOfficer && <div className="errorMessage">{errorMessage.raidOfficer}</div>}
          </div>
          <div>
            <label>Date</label>
            <input type='date' name='date' value={date} onChange={(e) => setDate(e.target.value)} />
            {errorMessage.date && <div className="errorMessage">{errorMessage.date}</div>}
          </div>
          <div>
            <label>Violator Name</label>
            <input type='text' name='violator name' value={violatorName} onChange={(e) => setViolatorName(e.target.value)} />
            {errorMessage.violatorName && <div className="errorMessage">{errorMessage.violatorName}</div>}
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
            {errorMessage.documents && <div className="errorMessage">{errorMessage.documents}</div>}
          </div>
          <button className='DMbut' type='button' onClick={addDocm}>Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export default FCDocManage;
