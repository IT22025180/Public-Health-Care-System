import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const EditLeave = () => {
  const { name, staffid, email, position, doleave, leavestrt, leaveend, leaveType } = useParams();

  const [employeeName, setEmployeeName] = useState(name);
  const [staffId, setStaffId] = useState(staffid);
  const [employeeEmail, setEmployeeEmail] = useState(email);
  const [employeePosition, setEmployeePosition] = useState(position);
  const [leaveDate, setLeaveDate] = useState(doleave);
  const [leaveStartDate, setLeaveStartDate] = useState(leavestrt);
  const [leaveEndDate, setLeaveEndDate] = useState(leaveend);
  const [leaveTypeValue, setLeaveTypeValue] = useState(leaveType);
  const [errorMessage, setErrorMessage] = useState({});

  const navigate = useNavigate();

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

  useEffect(() => {
    const validateForm = async () => {
      try {
        await validateSchema.validate({
          employeeName,
          staffId,
          employeeEmail,
          employeePosition,
          leaveDate,
          leaveStartDate,
          leaveEndDate,
          leaveTypeValue,
          errorMessage
        }, { abortEarly: false });

        // Clear error messages if validation passes
        setErrorMessage({});
      } catch (error) {
        // Set error messages if validation fails
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      }
    };

    // Validate form fields on component mount
    validateForm();
  }, []);

  const updateLeave = async (_id, name, staffid, email, position, doleave, leavestrt, leaveend, leaveType) => {
    try {
      const response = await Axios.post('http://localhost:4000/api/updateLeave', {
        _id,
        name,
        staffid,
        email,
        position,
        doleave,
        leavestrt,
        leaveend,
        leaveType
      });
      console.log("Leave updated successfully", response.data);
      return response;
    } catch(error) {
      console.error('Error updating leave:', error);
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
        leaveStartDate,
        leaveEndDate,
        leaveTypeValue,
        errorMessage
      }, { abortEarly: false });
  
      await updateLeave(staffid, employeeName, staffId, employeeEmail, employeePosition, leaveDate, leaveStartDate, leaveEndDate, leaveTypeValue);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Leave updated successfully.',
      }).then(() => {
        navigate('/LeaveTable'); // Navigate back to the LeaveTable component after successful update
      });
    } catch(error) {
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
              <select
                onChange={(e) => setLeaveTypeValue(e.target.value)}
                value={leaveTypeValue}
              >
                <option value="sick">Sick</option>
                <option value="vacation">Vacation</option>
                <option value="quitting">Quitting</option>
              </select>
            </div>
            {Object.keys(errorMessage).length > 0 && (
              <div className="error">
                {Object.values(errorMessage).map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
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
