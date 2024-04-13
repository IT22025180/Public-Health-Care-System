import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import "../styles/Leave.css";

const Leave = () => {
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveFor, setLeaveFor] = useState("Days");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");
  const [validationError, setValidationError] = useState(false);

  // UseParams hook to get the id from the URL
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch leave details if id is present (indicating edit mode)
      fetchLeaveDetails();
    }
  }, [id]);

  const fetchLeaveDetails = async () => {
    try {
      const response = await Axios.get(`http://localhost:4000/api/Leave/${id}`);
      const leaveData = response.data;
      setName(leaveData.name);
      setStaffId(leaveData.staffid);
      setEmail(leaveData.email);
      setPosition(leaveData.position);
      setLeaveType(leaveData.leaveType);
      setLeaveFor(leaveData.doleave);
      setLeaveStart(leaveData.leavestrt);
      setLeaveEnd(leaveData.leaveend);
    } catch (error) {
      console.error("Error fetching leave details:", error);
    }
  };

  const addOrUpdateLeave = async () => {
    // Validate form fields
    if (!name || !staffId || !email || !position || !leaveType || !leaveStart || !leaveEnd) {
      setValidationError(true);
      return;
    }
    setValidationError(false);

    try {
      let response;
      if (id) {
        // Update leave if id is present (indicating edit mode)
        response = await Axios.put(`http://localhost:4000/api/updateLeave/${id}`, {
          name: name,
          staffid: staffId,
          email: email,
          position: position,
          doleave: leaveFor,
          leavestrt: leaveStart,
          leaveend: leaveEnd,
          leaveType: leaveType,
        });
      } else {
        // Add new leave if no id is present (indicating add mode)
        response = await Axios.post("http://localhost:4000/api/addLeave", {
          name: name,
          staffid: staffId,
          email: email,
          position: position,
          doleave: leaveFor,
          leavestrt: leaveStart,
          leaveend: leaveEnd,
          leaveType: leaveType,
        });
      }

      console.log("Successfully", response.data);

      // Display success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: id ? "Leave updated Successfully" : "Leave added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Layout>
      <div className="layout-container5">
        <div className="leave">
          <form className="emailForm">
            <h2>{id ? 'Edit Leave' : 'Leave Request Form'}</h2>
            {/* Form fields */}
            {validationError && (
              <div className="alert alert-danger" role="alert">
                All fields are required.
              </div>
            )}
            <button onClick={addOrUpdateLeave} className="subBut" type="button">
              {id ? 'Update' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Leave;
