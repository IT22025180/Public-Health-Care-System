import React, { useEffect, useState } from 'react'
import '../styles/VaccineAppTab.css'
import Axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';

const VaccineAppTab = () => {
    //state variables
    const[vaccineappdata,setvaccineappdata]=useState([]);
    
 
    



    useEffect(()=>{
        getvaccineappdata();
    },[]);

    const getvaccineappdata =()=>{
        Axios.get('http://localhost:4000/api/VacccinesApp')
        .then(response => {
            console.log('data from server',response.data);
            setvaccineappdata(response.data.allVaccineAppointments);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }


    //delete

    const deletevaccineappdata = (id) => {
         // Display SweetAlert confirmation dialog
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, proceed with deletion
        Axios.post('http://localhost:4000/api/deleteVacApp',{_id: id})
        .then(response =>{
            console.log('Vaccine Data deleted successfully');
            setvaccineappdata(prevData => prevData.filter(vaccineapp => vaccineapp._id !== id));
            // Display success message
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
        });
    })
    
        .catch(error =>{
            console.error('Error deleting vaccineappdata:',error);
        });
    }
    });
}

    //update




  

  return (
    <div className='VaccineAppTab'>

    

        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine Name</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {vaccineappdata && vaccineappdata.length > 0 ?(                  
                    vaccineappdata.map((vaccineapp)=>(
                        <tr key={vaccineapp._id}>
                            <td>{vaccineapp.v_name}</td>
                            <td>{vaccineapp.quantity}</td>
                            <td>{vaccineapp.date}</td>
                            <td>{vaccineapp.location}</td>
                            
                            
                        
                        <td className='actionButtons'>
                            <button  >Edit</button>
                        </td>

                        <td onClick={() => deletevaccineappdata(vaccineapp._id)} className='deleteButtons'>
                            <button >Delete</button>
                        </td>
    
                    </tr>

                    ))

                ):(
                    <tr>
                        <td>You have not added any vaccine Appointments</td>
                    </tr>
                )}
               
            </tbody>
        </table>
        </div>
  )
}

export default VaccineAppTab

