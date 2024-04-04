import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser'
import '../styles/Leave.css'
import Layout from '../components/Layout';
import { Link,useHistory } from "react-router-dom";
import Axios from 'axios';



const Leave = ({submitted,data}) => {

  const[name,setname]=useState('');
  const[staffid,setstaffid]=useState('');
  const[email,setemail]=useState('');
  const[position,setposition]=useState('');
  const[doleave,setdoleave]=useState('');
  const[leavestrt,setleavestrt]=useState('');
  const[leaveend,setleaveend]=useState('');
  const[leaveType,setleaveType]=useState('');

  useEffect(()=>{
    if(!submitted){
      setname('');
      setstaffid('');
      setemail('');
      setposition('');
      setdoleave('');
      setleavestrt('');
      setleaveend('');
      setleaveType('');
    }
  },[submitted]);

  useEffect(()=>{
    if(data?.id && data.id !==0){
      setname(data.name);
      setstaffid(data.staffid);
      setemail(data.email);
      setposition(data.position);
      setdoleave(data.doleave);
      setleavestrt(data.leavestrt);
      setleaveend(data.leaveend);
      setleaveType(data.leaveType);

    }
  },[data]);

  const addLeave = async()=>{
    try{
      const response = await Axios.post('http://localhost:4000/api/addLeave',{
        name : name,
        staffid :staffid,
        email : email,
        position : position,
        doleave : doleave,
        leavestrt : leavestrt,
        leaveend : leaveend,
        leaveType : leaveType,
      });

      console.log('Successfully',response.data);
    }catch(error){
      console.error('error',error);
    }
  }

  return (
    <Layout>
      <div className="form1">
        <form  className="emailForm">
          <h2>Leave Request form</h2>
          <div>
            <label>Name:</label>
            <input onChange={e=>setname(e.target.value)} type="text" name="sName"  />
          </div>
          <div>
            <label>Staff ID:</label>
            <input  onChange={e=>setstaffid(e.target.value)} type="text" name="staffid"   />
          </div>
          <div>
            <label>Email:</label>
            <input  onChange={e=>setemail(e.target.value)} type="email" name="email" />
          </div>
          <div>
            <label>Position:</label>
            <input  onChange={e=>setposition(e.target.value)} type="text" name="Position"  />
          </div>
          <div>
            <label>Details of leave:</label>
            <div>
              <input value='Days'
                     checked={doleave === 'Days'}
                     onChange={e=>setdoleave(e.target.value)} type="radio" id="Position"  />
              Days
            </div>
            <div>
              <input value='Hours'
                     checked={doleave === 'Hours'}
                     onChange={e=>setdoleave(e.target.value)}type="radio" id="position"  />
              Hours
            </div>
          </div>
          <div>
            <label>Leave Start:</label>
            <input  onChange={e=>setleavestrt(e.target.value.toString())} type="Date" name="vdate"  />
          </div>
          <div>
            <label>Leave End:</label>
            <input  onChange={e=>setleaveend(e.target.value.toString())} type="Date" name="vdate"  />
          </div>
          <label>Leave type:</label>
            <div>
              <input value='Sick'
                     checked={leaveType === 'Sick'}
                     onChange={e=>setleaveType(e.target.value)} type="radio" id="leavetype" name="vtype"  />
              Sick
            </div>
            <div>
              <input value='Vacation'
                     checked={leaveType === 'Vacation'}
                     onChange={e=>setleaveType(e.target.value)} type="radio" id="leavetype" name="vtype"  />
              Vacation
            </div>
            <div>
              <input value='Quititing'
                     checked={leaveType === 'Quititing'}
                     onChange={e=>setleaveType(e.target.value)} type="radio" id="leavetype" name="vtype"  />
              Quititing
            </div>
          
          <Link to='/LeaveTable'>
          <button onClick = {addLeave} className='subBut' type="submit">Submit</button>
          </Link>
        </form>
      </div>
    </Layout>
  )
}

export default Leave;
