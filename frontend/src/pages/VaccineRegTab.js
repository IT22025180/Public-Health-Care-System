import React, { useEffect, useState } from 'react'
import '../styles/VaccineRegTab.css'
import Axios from 'axios';

const VaccineRegTab = () => {
    const[vaccinedata,setvaccinedata]=useState([]);

    useEffect(()=>{
        getvaccinedata();
    },[]);

    const getvaccinedata =()=>{
        Axios.get('http://localhost:4000/api/Vacccines')
        .then(response => {
            console.log('data from server',response.data);
            setvaccinedata(response.data.allVaccine);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }
    //delete

    const deletevaccinedata = (id) => {
        Axios.post('http://localhost:4000/api/deleteVac',{_id: id})
        .then(response =>{
            console.log('Vaccine Data deleted successfully');
            setvaccinedata(prevData => prevData.filter(vaccine => vaccine._id !== id));
        })
        .catch(error =>{
            console.error('Error deleting vaccinedata:',error);
        })
    }

    //delete

    const deletevaccinedata = (id) => {
        Axios.post('http://localhost:4000/api/deleteVac',{_id: id})
        .then(response =>{
            console.log('Vaccine Data deleted successfully');
            setvaccinedata(prevData => prevData.filter(vaccine => vaccine._id !== id));
        })
        .catch(error =>{
            console.error('Error deleting vaccinedata:',error);
        })
    }

    //update

    

    




  return (
    <div className='VaccineRegTab'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine Name</th>
                    <th>Manufactured Date</th>
                    <th>Expire Date</th>
                    <th>Quantity</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {vaccinedata && vaccinedata.length > 0 ?(
                    vaccinedata.map((vaccine)=>(
                        <tr key={vaccine._id}>
                            <td>{vaccine.vname}</td>
                            <td>{vaccine.manf_date}</td>
                            <td>{vaccine.expi_Date}</td>
                            <td>{vaccine.quantity}</td>
                            <td>{vaccine.notes}</td>
                            
                        
                        <td className='actionButtons'>
                            <button  >Edit</button>
                        </td>
<<<<<<< HEAD

=======
>>>>>>> 14c780fc (hima)
                        <td onClick={() => deletevaccinedata(vaccine._id)} className='deleteButtons'>
                            <button >Delete</button>
                        </td>
    
                    </tr>

                    ))

                ):(
                    <tr>
                        <td>You have not vaccine data</td>
                    </tr>
                )}
               
            </tbody>
        </table>
        </div>
  )
}

export default VaccineRegTab

