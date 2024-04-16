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
        Axios.get('http://localhost:4000/api/getVacRq')
          .then(response => {
            console.log('data from server', response.data);
            setvacreqData(response.data.allVaccineRq);
          })
          .catch(error => {
            console.error("Axios error: ", error);
          })
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
                </tr>
            </thead>
            <tbody>
                {vacreqData && vacreqData.length > 0 ?(                  
                    vacreqData.map((vacreqData)=>(
                        <tr key={vacreqData._id}>
                            <td>{vacreqData.vName}</td>
                            <td>{vacreqData.quantity}</td>
                            <td>{vacreqData.notification}</td>
                       
    
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

