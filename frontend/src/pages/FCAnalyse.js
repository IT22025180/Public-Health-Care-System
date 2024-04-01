import { useState } from "react";
import emailjs from '@emailjs/browser'
import '../styles/FCNotify.css'
import Layout from '../components/Layout';

const FCAnalyse = () => {

  const [email, setemail] = useState('');
  const [Vname, setName] = useState('');
  const [vtype, setvtype] = useState('');
  const [vdate, setvdate] = useState('');
  const [panelty, setPanelty] = useState('');
  const [policeStation, setpoliceStation] = useState('');
  const [date, setdate] = useState('');
  const [aname, setaname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = new Date(date);

    const serviceID = 'service_0r9kntj';
    const templateID = 'template_hrj18ia';
    const publicKey = 'evKLHFlH0AuDv1opA';

    const templateParams = {
      email: email,
      Vname: Vname,
      vtype: vtype,
      vdate: formattedDate.toLocaleDateString(),
      panelty: panelty,
      policeStation: policeStation,
      date: formattedDate.toLocaleDateString(),
      aname: aname
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email Sent Successfully', response);
        setemail('');
        setName('');
        setvtype('');
        setvdate('');
        setPanelty('');
        setpoliceStation('');
        setdate('');
        setaname('');
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
          <label>Email:</label>
          <input type="Email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
        </div>
        <div>
          <label>Violator Name:</label>
          <input type="text" name="Vname" value={Vname} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Violator Type:</label>
          <input type="text" name="vtype" value={vtype} onChange={(e) => setvtype(e.target.value)} />
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

export default FCAnalyse;