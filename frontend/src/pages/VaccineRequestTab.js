import React, { useEffect, useState } from 'react'
import '../styles/VaccineRequestTab.css'
import Axios from 'axios';

const VaccineRequestTab = () => {
    //state variables
    const[vaccinereqdata,setvaccinereqdata]=useState([]);
    

    



    useEffect(()=>{
        getvaccinereqdata();
    },[]);

    const getvaccinereqdata =()=>{
        Axios.get('http://localhost:4000/api/VacccinesReq')
        .then(response => {
            console.log('data from server',response.data);
            setvaccinereqdata(response.data.allVaccineRq);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }


    //delete

    const deletevaccinereqdata = (id) => {
        Axios.post('http://localhost:4000/api/deleteVacRq',{_id: id})
        .then(response =>{
            console.log('Vaccine Data deleted successfully');
            setvaccinereqdata(prevData => prevData.filter(vaccinereq => vaccinereq._id !== id));
        })
        .catch(error =>{
            console.error('Error deleting vaccineappdata:',error);
        })
    }



    //update




  

  return (
    <div className='VaccineReqTab'>

    

        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine Name</th>
                    <th>Quantity</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {vaccinereqdata && vaccinereqdata.length > 0 ?(                  
                    vaccinereqdata.map((vaccinereq)=>(
                        <tr key={vaccinereq._id}>
                            <td>{vaccinereq.vName}</td>
                            <td>{vaccinereq.quantity}</td>

                            
                            
                        
                        <td className='actionButtons'>
                            <button  >Edit</button>
                        </td>

                        <td onClick={() => deletevaccinereqdata(vaccinereq._id)} className='deleteButtons'>
                            <button >Delete</button>
                        </td>
    
                    </tr>

                    ))

                ):(
                    <tr>
                        <td>You have not added any vaccine Requests</td>
                    </tr>
                )}
               
            </tbody>
        </table>
        </div>
  )
}

export default VaccineRequestTab

