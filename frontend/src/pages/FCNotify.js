import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import '../styles/FCNotify.css';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';

const FCNotify = () => {
  const [email, setemail] = useState('');
  const [Vname, setName] = useState('');
  const [vdate, setvdate] = useState('');
  const [panelty, setPanelty] = useState('');
  const [policeStation, setpoliceStation] = useState('');
  const [date, setdate] = useState('');
  const [aname, setaname] = useState('');
  const [violationType, setViolationType] = useState('');
  const [cNumber, setcNumber] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { v_name, v_email, date, v_type, decision} = location.state;
      setName(v_name);
      setemail(v_email);
      setvdate(date);
      setViolationType(v_type);
      setPanelty(decision);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = new Date(date);

    const serviceID = 'service_0r9kntj';
    const templateID = 'template_hrj18ia';
    const publicKey = 'evKLHFlH0AuDv1opA';

    const templateParams = {
      cNumber: cNumber,
      email: email,
      Vname: Vname,
      vtype: violationType,
      vdate: formattedDate.toLocaleDateString(),
      panelty: panelty,
      policeStation: policeStation,
      date: formattedDate.toLocaleDateString(),
      aname: aname
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email Sent Successfully', response);
        setcNumber('');
        setemail('');
        setName('');
        setViolationType('');
        setvdate('');
        setPanelty('');
        setpoliceStation('');
        setdate('');
        setaname('');
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email sent successfully!',
          allowOutsideClick: false,
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/Fine-And-court');
        });
      })
      .catch((error) => {
        console.error('Error sending Email', error);
      });
  }

  return (
    <Layout>
      <div className="form1">
        <form onSubmit={handleSubmit} className="emailForm">
          <h2>Notify Violator</h2>
          <div>
            <label>Case Number:</label>
            <input type="Number" name="cNumber" value={cNumber} onChange={(e) => setcNumber(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="Email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>
          <div>
            <label>Violator Name:</label>
            <input type="text" name="Vname" value={Vname} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Violation Type:</label>
            <div>
              <input type="radio" id="foodViolation" name="vtype" value="Food Violation" checked={violationType === "Food Violation"} onChange={(e) => setViolationType(e.target.value)} />
              Food Violation
            </div>
            <div>
              <input type="radio" id="dengueViolation" name="vtype" value="Dengue Violation" checked={violationType === "Dengue Violation"} onChange={(e) => setViolationType(e.target.value)} />
              Dengue Violation
            </div>
          </div>
          <div>
            <label>Violated Date:</label>
            <input type="Date" name="vdate" value={vdate} onChange={(e) => setvdate(e.target.value)} />
          </div>
          <div>
            <label>Panelty Action:</label>
            <input type="text" name="panelty" value={panelty} onChange={(e) => setPanelty(e.target.value)} />
          </div>
          <div>
            <label>Police Station:</label>
            <input type="text" name="policeStation" value={policeStation} onChange={(e) => setpoliceStation(e.target.value)} />
          </div>
          <div>
            <label>Due Date:</label>
            <input type="Date" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
          </div>
          <div>
            <label>Analyse By:</label>
            <input type="text" name="aname" value={aname} onChange={(e) => setaname(e.target.value)} />
          </div>
          <button className='notifyBut' type="submit">Send Email</button>
        </form>
      </div>
    </Layout>
  )
}

export default FCNotify;
