import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Dengueschedules.css';
import Axios from 'axios';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert
import Alert from 'react-bootstrap/Alert'; // Import Bootstrap Alert component

const Dengueschedules = ({ submitted, data }) => {
     const [campdata,setcampdata]=useState([]);
     const [open, openConfirm] = useState(false);
     const [staffmember,setstaffmember]=useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        getcampdata();
    },[]);

    const functionPopup = () => {
        
      openConfirm(true);
  }

    const closepopup = () => {
      openConfirm(false);
  }

    const getcampdata =()=>{
        Axios.get('http://localhost:4000/api/camp')
        .then(response => {
            console.log('data from server',response.data);
            setcampdata(response.data.allCampaign);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    } ;
    const filteredcampdata = campdata.filter(camp=> {

      return camp.date?.toLowerCase().includes(searchQuery.toLowerCase());
  
  });
  
  const addstaffdengue = async()=>{
try{
  const response = await Axios.post("http://localhost:4000/api/addstaffdengue",{
    
      venue:campdata.venue,      
      date:campdata.date,
      staffmember:staffmember, 
      time:campdata.time,  
}
  )
  console.log("Successfully", response.data);

}catch (error) {
  console.error("error", error);
}  }


  return (
    <>
    <Layout>
      <div className='Dcamptable'>
         <form className= "campsearch_bar">
         <input  placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
         </form>
        <table border ={1} cellPadding={10} cellSpacing={0}>
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
             {filteredcampdata && filteredcampdata.length > 0 ? (
                filteredcampdata.map((camp)=>(
                <tr key={camp._id}>
                    <td>{camp.venue}</td>
                    <td>{camp.date}</td>
                    <td>{camp.time}</td>
                    <td>{camp.drName}</td>
                   
          
                    <td className='reportButtons'>
                    <button onClick={functionPopup}>Assign Staff</button>
                    </td>
                </tr>))
            ):(
                <tr>
                    <td>You have not camp data</td>
                </tr>
             )}   
               
            </tbody>
        </table>
        </div>
    </Layout>
    <Dialog open = {open}>
     <DialogTitle>Assign staff</DialogTitle>
     <DialogContent>
      <p>{campdata.venue}</p>
      <p>{campdata.date}</p>
      <p>{campdata.time}</p>
      <input type='text'onChange={(e) => setstaffmember(e.target.value)}></input>
      <button onClick={addstaffdengue} >submit</button>
      <button onClick={closepopup}>close</button>
     </DialogContent>
    </Dialog> </>
  );
};

export default Dengueschedules;
