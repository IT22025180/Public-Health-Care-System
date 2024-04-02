import { useState } from "react";
import emailjs from '@emailjs/browser'
import '../styles/Leave.css'
import Layout from '../components/Layout';

const Leave = () => {
  

  return (
    <Layout>
      <div className="form1">
        <form  className="emailForm">
          <h2>Leave Request form</h2>
          <div>
            <label>Name:</label>
            <input type="text" name="sName"  />
          </div>
          <div>
            <label>Staff ID:</label>
            <input type="text" name="staffid"   />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label>Position:</label>
            <input type="text" name="Position"  />
          </div>
          <div>
            <label>Details of leave:</label>
            <div>
              <input type="radio" id="Position"  />
              Days
            </div>
            <div>
              <input type="radio" id="position"  />
              Hours
            </div>
          </div>
          <div>
            <label>Leave Start:</label>
            <input type="Date" name="vdate"  />
          </div>
          <div>
            <label>Leave End:</label>
            <input type="Date" name="vdate"  />
          </div>
          <label>Leave type:</label>
            <div>
              <input type="radio" id="leavetype" name="vtype"  />
              Sick
            </div>
            <div>
              <input type="radio" id="leavetype" name="vtype"  />
              Vacation
            </div>
            <div>
              <input type="radio" id="leavetype" name="vtype"  />
              Quititing
            </div>
          
          <button className='subBut' type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default Leave;
