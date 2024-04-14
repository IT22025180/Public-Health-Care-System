import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditLeave = () => {
  const {_id, name, staffid, email, position, doleave, leavestrt, leaveend, leaveType } = useParams();
  const [employeeName, setEmployeeName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [leavesfor, setLeavesFor] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveTypeValue, setLeaveTypeValue] = useState(leaveType);
  const navigate = useNavigate();

  useEffect(() => {
    setEmployeeName(name);
    setStaffId(staffid);
    setEmployeeEmail(email);
    setEmployeePosition(position);
    setLeaveStartDate(leavestrt);
    setLeaveEndDate(leaveend);
    setLeaveTypeValue(leaveType);
    setLeavesFor(doleave)

  }, [name, staffid, email, position,doleave, leavestrt, leaveend, leaveType]);
  

  const updateLeaves = async () => {
    try {
      const response = await Axios.post('http://localhost:4000/api/updateLeave', {
        _id: _id,
        name: employeeName,
        staffid: staffId,
        email: employeeEmail,
        position: employeePosition,
        doleave: doleave,
        leavestrt: leaveStartDate,
        leaveend: leaveEndDate,
        leaveType: leaveType,
      });
  
      console.log('Form Update successfully', response.data);
      // Update state variables with response data
      setEmployeeName(response.data.data.name);
      setStaffId(response.data.data.staffid);
      setEmployeeEmail(response.data.data.email);
      setEmployeePosition(response.data.data.position);
      setLeavesFor(response.data.data.doleave);
      setLeaveStartDate(response.data.data.leavestrt);
      setLeaveEndDate(response.data.data.leaveend);
      setLeaveTypeValue(response.data.data.leaveType);
  
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Leave updated successfully.',
      }).then(() => {
        navigate('/LeaveTable');
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Resource not found');
        // Handle 404 error here, show error message to the user, etc.
      } else {
        console.log('Error', error);
        // Handle other errors if needed
      }
    }
  };
  
  

  return (
    <Layout>
      <div className="layout-container5">
        <div className="leave">
          <form className="emailForm">
            <h2>Leave Request Form</h2>
            <div>
              <label>Name:</label>
              <input
                onChange={(e) => setEmployeeName(e.target.value)}
                type="text"
                name="name"
                value={employeeName}
              />
            </div>
            <div>
              <label>Staff ID:</label>
              <input
                onChange={(e) => setStaffId(e.target.value)}
                type="text"
                name="staffId"
                value={staffId}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                onChange={(e) => setEmployeeEmail(e.target.value)}
                type="email"
                name="email"
                value={employeeEmail}
              />
            </div>
            <div>
              <label>Position:</label>
              <input
                onChange={(e) => setEmployeePosition(e.target.value)}
                type="text"
                name="position"
                value={employeePosition}
              />
            </div>
            <div>
              <label>Details of leave:</label>
              <div>
                <input
                  value="Days"
                  checked={leavesfor === "Days"}
                  onChange={() => setLeavesFor("Days")}
                  type="radio"
                  id="days"
                />
                <label htmlFor="days">Days</label>
              </div>
              <div>
                <input
                  value="Hours"
                  checked={leavesfor === "Hours"}
                  onChange={() => setLeavesFor("Hours")}
                  type="radio"
                  id="hours"
                />
                <label htmlFor="hours">Hours</label>
              </div>
            </div>
            <div>
              <label>Leave Start Date:</label>
              <input
                onChange={(e) => setLeaveStartDate(e.target.value)}
                type="date"
                name="leaveStartDate"
                value={leaveStartDate}
              />
            </div>
            <div>
              <label>Leave End Date:</label>
              <input
                onChange={(e) => setLeaveEndDate(e.target.value)}
                type="date"
                name="leaveEndDate"
                value={leaveEndDate}
              />
            </div>
            <div>
              <label>Leave Type:</label>
              <div>
              <input
                 value="Sick"
                 checked={leaveTypeValue === "Sick"}
                 onChange={() => setLeaveTypeValue("Sick")} // Update leaveTypeValue correctly
                 type="radio"
                 id="sick"
               />
               <label htmlFor="sick">Sick</label>
              </div>
              <div>
                <input
                  value="Vacation"
                  checked={leaveTypeValue === "Vacation"}
                  onChange={() => setLeaveTypeValue("Vacation")}
                  type="radio"
                  id="vacation"
                />
                <label htmlFor="vacation">Vacation</label>
              </div>
              <div>
                <input
                  value="Quitting"
                  checked={leaveTypeValue === "Quitting"}
                  onChange={() => setLeaveTypeValue("Quitting")}
                  type="radio"
                  id="quitting"
                />
                <label htmlFor="quitting">Quitting</label>
              </div>
            </div>
            <button onClick={updateLeaves} className="subBut" type="button">
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditLeave;
