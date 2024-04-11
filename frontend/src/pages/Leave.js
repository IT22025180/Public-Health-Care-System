import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import Layout from "../components/Layout";
import Swal from "sweetalert2"; // Import SweetAlert
import "../styles/Leave.css";

const Leave = ({ submitted, data }) => {
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveFor, setLeaveFor] = useState("Days");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");

  useEffect(() => {
    if (!submitted) {
      setName("");
      setStaffId("");
      setEmail("");
      setPosition("");
      setLeaveType("");
      setLeaveFor("Days");
      setLeaveStart("");
      setLeaveEnd("");
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setName(data.name);
      setStaffId(data.staffid);
      setEmail(data.email);
      setPosition(data.position);
      setLeaveType(data.leaveType);
      setLeaveFor(data.doleave);
      setLeaveStart(data.leavestrt);
      setLeaveEnd(data.leaveend);
    }
  }, [data]);

  const addLeave = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/api/addLeave", {
        name: name,
        staffid: staffId,
        email: email,
        position: position,
        doleave: leaveFor,
        leavestrt: leaveStart,
        leaveend: leaveEnd,
        leaveType: leaveType,
      });

      console.log("Successfully", response.data);

      // Display success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Leave added Successfully",
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
            <h2>Leave Request Form</h2>
            <div>
              <label>Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                value={name}
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
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                value={email}
              />
            </div>
            <div>
              <label>Position:</label>
              <input
                onChange={(e) => setPosition(e.target.value)}
                type="text"
                name="position"
                value={position}
              />
            </div>
            <div>
              <label>Details of leave:</label>
              <div>
                <input
                  value="Days"
                  checked={leaveFor === "Days"}
                  onChange={() => setLeaveFor("Days")}
                  type="radio"
                  id="days"
                />
                <label htmlFor="days">Days</label>
              </div>
              <div>
                <input
                  value="Hours"
                  checked={leaveFor === "Hours"}
                  onChange={() => setLeaveFor("Hours")}
                  type="radio"
                  id="hours"
                />
                <label htmlFor="hours">Hours</label>
              </div>
            </div>
            <div>
              <label>Leave Start:</label>
              <input
                onChange={(e) => setLeaveStart(e.target.value)}
                type="date"
                name="leaveStart"
                value={leaveStart}
              />
            </div>
            <div>
              <label>Leave End:</label>
              <input
                onChange={(e) => setLeaveEnd(e.target.value)}
                type="date"
                name="leaveEnd"
                value={leaveEnd}
              />
            </div>
            <div>
              <label>Leave type:</label>
              <div>
                <input
                  value="Sick"
                  checked={leaveType === "Sick"}
                  onChange={() => setLeaveType("Sick")}
                  type="radio"
                  id="sick"
                />
                <label htmlFor="sick">Sick</label>
              </div>
              <div>
                <input
                  value="Vacation"
                  checked={leaveType === "Vacation"}
                  onChange={() => setLeaveType("Vacation")}
                  type="radio"
                  id="vacation"
                />
                <label htmlFor="vacation">Vacation</label>
              </div>
              <div>
                <input
                  value="Quitting"
                  checked={leaveType === "Quitting"}
                  onChange={() => setLeaveType("Quitting")}
                  type="radio"
                  id="quitting"
                />
                <label htmlFor="quitting">Quitting</label>
              </div>
            </div>
            {/* Use Link to navigate */}
            <Link to="/LeaveTable">
              <button onClick={addLeave} className="subBut" type="button">
                Submit
              </button>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Leave;
