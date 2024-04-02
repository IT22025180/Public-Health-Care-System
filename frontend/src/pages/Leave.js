import React from 'react';
import Layout from '../components/Layout';
import '../styles/Leave.css';

const Leave = () => {
  return (
    <Layout>
      <div className="leave-container"> {/* Wrap the form in a container */}
      <div className='title'>
        <h3>Leave Submission Form</h3>
      </div>
      <form className='addleave'>
        <div className='input'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='bname' autoComplete='off' placeholder='First Name'/>

          <label htmlFor='name'>Last Name</label>
          <input type='text' id='bname' autoComplete='off' placeholder='Last Name'/>
        </div>

        <div className='input'>
          <label htmlFor='staffid'>Staff ID</label>
          <input type='text' id='bname' autoComplete='off' placeholder='Staff ID'/>
        </div>

        <div className='input'>
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' autoComplete='off' placeholder='Email'/>
        </div>

        <div className='input'>
          <label htmlFor='pnumber'>Contact number</label>
          <input type='text' id='pnumber' autoComplete='off' placeholder='07xxxxxxxx'/>
        </div>

        <div className='input'>
          <label htmlFor='position'>Position</label>
          <input type='text' id='position' autoComplete='off' placeholder='Doctor/Nurse/PHI...'/>
        </div>

        <div>
          <label htmlFor='leavefor'>Leave for</label>
          <input type="radio" id="leaveForDays" name="leaveType" value="days" />
          <label htmlFor="leaveForDays">Days</label>

          <input type="radio" id="leaveForHours" name="leaveType" value="hours" />
          <label htmlFor="leaveForHours">Hours</label>
        </div>

        <div className='input'>
          <div>
            <label htmlFor='leaveStartDate'>Leave Start Date:</label>
            <input type="date" id="leaveStartDate" name="leaveStartDate"/>

            <label htmlFor='leaveEndDate'>Leave End Date:</label>
            <input type="date" id="leaveEndDate" name="leaveEndDate"/>
          </div>
        </div>

        <div>
          <label>Leave Type:</label><br/>
          <input type="radio" id="vacation" name="leaveType" value="vacation" />
          <label htmlFor="vacation">Vacation</label><br/>

          <input type="radio" id="sickLeave" name="leaveType" value="sickLeave" />
          <label htmlFor="sickLeave">Sick Leave</label><br/>

          <input type="radio" id="quitting" name="leaveType" value="quitting" />
          <label htmlFor="quitting">Quitting</label><br/>
        </div>

        <button className='bsubmit' type='submit'>Submit</button>
      </form>
    </div>
    </Layout>
  );
}

export default Leave;
