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
  const [officer, setofficer] = useState('');

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
            setofficerdata(response.data);
        })
        .catch(error => {
            console.error("Axios error:", error);
        })
}

  const addraidofficer = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/api/addraidofficer", {
        Name: stofficerdata.venue,
        Type: stofficerdata.Type,
        officer: officer,
        Address: stofficerdata.Address,
      });
      console.log("Successfully", response.data);
      openConfirm(false);
      setraidofficer('');

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
      <div className='Raidooficertable'>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Address </th>
              <th>Assign Officer</th>
            </tr>
          </thead>
          <tbody>
            {officerdata && officerdata.length > 0 ? (
              officerdata.map((Complain) => (
                <tr key={Complain._id}>
                  <td>{Complain.Name}</td>
                  <td>{Complain.Type}</td>
                  <td>{Complain.Address}</td>
                  <td className='reportButtons'>
                    <button onClick={() => functionPopup(Complain)}>Assign Officer</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>You have no Complain data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog open={open}>
        <DialogTitle>Assign Officer</DialogTitle>
        <DialogContent>
          <p>{stofficerdata.Name}</p>
          <p>{stofficerdata.Type}</p>
          <p>{stofficerdata.Address}</p>
          <input type='text' value={officer} onChange={(e) => setofficer(e.target.value)}></input>
          <Link to="/Raidoffersforcomplain">
            <button onClick={addraidofficer}>Submit</button>
          </Link>
          <button onClick={closepopup}>Close</button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Raidoffersforcomplain;