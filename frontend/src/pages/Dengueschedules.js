// Dengueschedules.jsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Axios from 'axios';
import Swal from 'sweetalert2';

const Dengueschedules = () => {
  const [campdata, setCampdata] = useState([]);
  const [stcampdata, setStcampdata] = useState({});
  const [open, setOpen] = useState(false);
  const [staffmember, setStaffmember] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getCampData();
  }, []);

  const functionPopup = (camp) => {
    setStcampdata(camp);
    setOpen(true);
  }

  const closePopup = () => {
    setOpen(false);
  }

  const getCampData = () => {
    Axios.get('http://localhost:4000/api/camp')
      .then(response => {
        setCampdata(response.data.allCampaign);
      })
      .catch(error => {
        console.error("Axios error: ", error);
      })
  };

  const addStaffDengue = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/api/addstaffdengue", {
        venue: stcampdata.venue,
        date: stcampdata.date,
        staffmember: staffmember,
        time: stcampdata.time,
        drName: stcampdata.drName
      });
      setOpen(false);
      setStaffmember('');

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

  const filteredCampData = campdata.filter(camp => {
    return camp.date?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Layout>
      <div className='Dcamptable'>
        <form className="campsearch_bar">
          <input placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </form>

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
            {filteredCampData && filteredCampData.length > 0 ? (
              filteredCampData.map((camp) => (
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
                <td colSpan="5">You have no camp data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open}>
        <DialogTitle>Assign staff</DialogTitle>
        <DialogContent>
          <p>Venue: {stcampdata.venue}</p>
          <p>Date: {stcampdata.date}</p>
          <p>Time: {stcampdata.time}</p>
          <input type='text' value={staffmember} onChange={(e) => setStaffmember(e.target.value)}></input>
          <Link to="/DengueAssignTable">
            <button onClick={addStaffDengue}>Submit</button>
          </Link>
          <button onClick={closePopup}>Close</button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dengueschedules;
