import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const EditLeave = () => {
  const { name, staffid, email, position, doleave, leavestrt, leaveend, leaveType } = useParams();
  const [employeeName, setEmployeeName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveStartDate, setLeaveStartDate] = useState('');
  const [leaveEndDate, setLeaveEndDate] = useState('');
  const [leaveTypeValue, setLeaveTypeValue] = useState('');
  const [errorMessage, setErrorMessage] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setEmployeeName(name);
    setStaffId(staffid);
    setEmployeeEmail(email);
    setEmployeePosition(position);
    setLeaveDate(doleave);
    setLeaveStartDate(leavestrt);
    setLeaveEndDate(leaveend);
    setLeaveTypeValue(leaveType);
  }, [name, staffid, email, position, doleave, leavestrt, leaveend, leaveType]);

  const validateSchema = Yup.object().shape({
    employeeName: Yup.string().required('Employee Name is required').matches(/^[A-Za-z\s]+$/, 'Employee Name must contain only letters'),
    staffId: Yup.string().required('Staff ID is required').matches(/^[A-Za-z0-9]+$/, 'Staff ID must contain only letters and numbers'),
    employeeEmail: Yup.string().required('Employee Email is required').email('Invalid email format'),
    employeePosition: Yup.string().required('Employee Position is required').matches(/^[A-Za-z\s]+$/, 'Employee Position must contain only letters'),
    leaveDate: Yup.date().required('Date of Leave is required'),
    leaveStartDate: Yup.date().required('Leave Start Date is required'),
    leaveEndDate: Yup.date().required('Leave End Date is required'),
    leaveTypeValue: Yup.string().required('Leave Type is required').oneOf(['sick', 'vacation', 'quitting'], 'Please select a valid leave type'),
  });

  const updateLeaves = async (name, staffid, email, doleave, leavestrt, leaveend, leaveType) => {
    try {
      const response = await Axios.post('http://localhost:4000/api/updateLeave', {
        name,
        staffid,
        email,
        position: employeePosition,
        doleave,
        leavestrt,
        leaveend,
        leaveType
      });
      console.log("Form Update successfully", response.data);
      return response;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  const updateL = async () => {
    try {
      // Validate form fields before submission
      await validateSchema.validate({
        employeeName,
        staffId,
        employeeEmail,
        employeePosition,
        leaveDate,
        leaveStartDate,
        leaveEndDate,
        leaveTypeValue,
      }, { abortEarly: false });

      const leaveTypeText = leaveTypeValue === 'sick' ? 'Sick Leave' : leaveTypeValue === 'vacation' ? 'Vacation Leave' : leaveTypeValue === 'quitting' ? 'Quitting Leave' : '';

      await updateLeaves(name, staffid, email, doleave, leavestrt, leaveend, leaveTypeText);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Document added successfully.',
      }).then(() => {
        navigate('/LeaveTable');
      });
    } catch (error) {
      const errors = {};
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
      setErrorMessage(errors);
      console.log("Error", error);
    }
  }

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
              {errorMessage.employeeName && <div className='errorMessage'>{errorMessage.employeeName}</div>}
            </div>
            <div>
              <label>Staff ID:</label>
              <input
                onChange={(e) => setStaffId(e.target.value)}
                type="text"
                name="staffId"
                value={staffId}
              />
              {errorMessage.staffId && <div className='errorMessage'>{errorMessage.staffId}</div>}
            </div>
            <div>
              <label>Email:</label>
              <input
                onChange={(e) => setEmployeeEmail(e.target.value)}
                type="email"
                name="email"
                value={employeeEmail}
              />
              {errorMessage.employeeEmail && <div className='errorMessage'>{errorMessage.employeeEmail}</div>}
            </div>
            <div>
              <label>Position:</label>
              <input
                onChange={(e) => setEmployeePosition(e.target.value)}
                type="text"
                name="position"
                value={employeePosition}
              />
              {errorMessage.employeePosition && <div className='errorMessage'>{errorMessage.employeePosition}</div>}
            </div>
            <div>
              <label>Leave Start Date:</label>
              <input
                onChange={(e) => setLeaveStartDate(e.target.value)}
                type="date"
                name="leaveStartDate"
                value={leaveStartDate}
              />
              {errorMessage.leaveStartDate && <div className='errorMessage'>{errorMessage.leaveStartDate}</div>}
            </div>
            <div>
              <label>Leave End Date:</label>
              <input
                onChange={(e) => setLeaveEndDate(e.target.value)}
                type="date"
                name="leaveEndDate"
                value={leaveEndDate}
              />
              {errorMessage.leaveEndDate && <div className='errorMessage'>{errorMessage.leaveEndDate}</div>}
            </div>
            <div>
              <label>Leave Type:</label>
              <select
                onChange={(e) => setLeaveTypeValue(e.target.value)}
                value={leaveTypeValue}
              >
                <option value="sick">Sick</option>
                <option value="vacation">Vacation</option>
                <option value="quitting">Quitting</option>
              </select>
              {errorMessage.leaveTypeValue && <div className='errorMessage'>{errorMessage.leaveTypeValue}</div>}
            </div>
            <button onClick={updateL} className="subBut" type="button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default EditLeave;
