import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Swal from 'sweetalert2';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

const Raidoffersforcomplain = () => {
  const [officerdata, setofficerdata] = useState([]);
  const [stofficerdata, setstofficerdata] = useState([]);
  const [open, openConfirm] = useState(false);
  const [raidofficer, setraidofficer] = useState('');

  useEffect(() => {
    getComplainsdata();
  }, []);

  const functionPopup = (Complain) => {
    setstofficerdata(Complain);
    openConfirm(true);
  }

  const closepopup = () => {
    openConfirm(false);
  }

  const getComplainsdata = () => {
    Axios.get('http://localhost:4000/api/Complain')
        .then(response => {

            console.log('data from sever', response.data);
            setComplainsdata(response.data);
        })
        .catch(error => {
            console.error("Axios error:", error);
        })
}

  const addstaffdengue = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/api/addstaffdengue", {
        venue: stcampdata.venue,
        date: stcampdata.date,
        staffmember: staffmember,
        time: stcampdata.time,
      });
      console.log("Successfully", response.data);
      openConfirm(false);
      setstaffmember('');

      Swal.fire({
        title: "Success!",
        text: "Staff added successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <Layout>
      <div className='Dcamptable'>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Venue</th>
              <th>Date</th>
              <th>Starting time</th>
              <th>Conducted by</th>
              <th>Assign Staff</th>
            </tr>
          </thead>
          <tbody>
            {campdata && campdata.length > 0 ? (
              campdata.map((camp) => (
                <tr key={camp._id}>
                  <td>{camp.venue}</td>
                  <td>{camp.date}</td>
                  <td>{camp.time}</td>
                  <td>{camp.drName}</td>
                  <td className='reportButtons'>
                    <button onClick={() => functionPopup(camp)}>Assign Staff</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>You have no camp data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog open={open}>
        <DialogTitle>Assign staff</DialogTitle>
        <DialogContent>
          <p>{stcampdata.venue}</p>
          <p>{stcampdata.date}</p>
          <p>{stcampdata.time}</p>
          <input type='text' value={staffmember} onChange={(e) => setstaffmember(e.target.value)}></input>
          <Link to="/DengueAssignTable">
            <button onClick={addstaffdengue}>Submit</button>
          </Link>
          <button onClick={closepopup}>Close</button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Raidoffersforcomplain;