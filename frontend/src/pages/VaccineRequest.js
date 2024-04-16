import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"; 
import '../styles/VaccineRequest.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import {Link} from 'react-router-dom';


const VaccineRequest =() => {
    const[bvaccinedata,setbvaccinedata]=useState([]);
    const [stvreqpdata, setstvreqpdata] = useState({});
    const [open, setOpen] = useState(false);
    const [notification, setnotification] = useState('');

    useEffect(()=>{
        getbvaccinedata();
    },[]);

    const functionPopup = (babyvacc) => {
        setOpen(true);
        setstvreqpdata(babyvacc);
      }
    
      const closePopup = () => {
        setOpen(false);
      }

    const getbvaccinedata =()=>{
        Axios.get('http://localhost:4000/api/babyvacc')
        .then(response=>{
            console.log('data from sever',response.data);
            setbvaccinedata(response.data.allBVac);
        })
        .catch(error=>{
            console.error('Axios error:',error);
        })
    }

    const addVacRq = async () => {
        try {
          const response = await Axios.post("http://localhost:4000/api/addVacRq", {
            type : stvreqpdata.type,
            esti_Date:stvreqpdata.esti_Date ,
            quantity:stvreqpdata.quantity ,
            notification:notification,
          });
          console.log("Successfully", response.data);
            setOpen(false);
            setnotification('');

          Swal.fire({
            title: "Success!",
            text: "Status added successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
    
        } catch (error) {
          console.error("error", error);
        }
      }
    

    return(
        <>
        <Layout>
            <div className='Bvaccinetable'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine Type</th>
                    <th>Estimated Date</th>
                    <th>Quantity</th>
                    <th>Status</th>
                   
                </tr>
            </thead>
            <tbody>
            {bvaccinedata && bvaccinedata.length > 0 ?(
                    bvaccinedata.map((bvaccine)=>(
                <tr key={bvaccine._id}>
                    <td>{bvaccine.type}</td>
                    <td>{bvaccine.esti_Date} </td>
                    <td>{bvaccine.quantity}</td>
                    
                    <td className='actionButtons'>
                        <button onClick={() => functionPopup(bvaccine)}>Status</button>
                    </td>
                </tr>
                    ))
                    ):(
                        <tr>
                            <td>You have not baby vaccine data</td>
                        </tr>  
                )}
            </tbody>
        </table>
        </div>
    </Layout>
     <Dialog open={open} onClose={closePopup}> {/* Added onClose prop to Dialog component */}
     <DialogTitle>Status</DialogTitle>
     <DialogContent>
         <p>{stvreqpdata.type}</p>
         <p>{stvreqpdata.esti_Date}</p>
         <p>{stvreqpdata.quantity}</p>
         <input type='text' onChange={(e) => setnotification(e.target.value)} />
         <Link to = "/VaccineRequestTab">
         <button onClick={addVacRq}>Submit</button>
         </Link>
         <button onClick={closePopup}>Close</button>
     </DialogContent>
 </Dialog></>
    )
}
export default VaccineRequest

