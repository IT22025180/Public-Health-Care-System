import React, { useEffect, useState } from 'react'
import '../styles/VaccineRequestTab.css'
import Axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';

const VaccineRequestTab = () => {

    const [vacreqData, setvacreqData] = useState([]);


    useEffect(() => {
        getvacreqData();
      }, []);
    

    const getvacreqData = () => {
        Axios.get('http://localhost:4000/api/VacccinesReq')
          .then(response => {
            console.log('data from server', response.data);
            setvacreqData(response.data.allVaccineRq);
          })
          .catch(error => {
            console.error("Axios error: ", error);
          })
      };


      //delete

    const deletevaccinereqdata = (id) => {
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
       Axios.post('http://localhost:4000/api/deleteVacRq',{_id: id})
       .then(response =>{
           console.log('Vaccine Data deleted successfully');
           setvacreqData(prevData => prevData.filter(vacreqData => vacreqData._id !== id));
           // Display success message
           Swal.fire({
               title: "Deleted!",
               text: "Your file has been deleted.",
               icon: "success"
       });
   })
   
       .catch(error =>{
           console.error('Error deleting vaccinereqdata:',error);
       });
   }
   });
};

  return (
   <Layout>
     <div className='VaccineReqTab'>
        <h2>Vaccine Status</h2>

    

        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine type</th>
                    <th>Estimated date</th>
                    <th>qunatity</th>
                    <th>status</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {vacreqData && vacreqData.length > 0 ?(                  
                    vacreqData.map((vacreqData)=>(
                        <tr key={vacreqData._id}>
                            <td>{vacreqData.type}</td>
                            <td>{vacreqData.esti_Date}</td>
                            <td>{vacreqData.quantity}</td>
                            <td>{vacreqData.notification}</td>


                            <td onClick={() => deletevaccinereqdata(vacreqData._id)} className='deleteButtons'>
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
   </Layout>
  )
}

export default VaccineRequestTab

