import React, { useEffect, useState } from 'react'
import '../styles/VaccineRegTab.css'
import Axios from 'axios';

const VaccineRegTab = () => {
    //state variables
    const[vaccinedata,setvaccinedata]=useState([]);
    const[searchQuery, setSearchQuery] = useState('');//search

    



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



    //update




    //search
    const filteredVaccineData = vaccinedata.filter(vaccine => {
        return vaccine.vname.toLowerCase().includes(searchQuery.toLowerCase());
    });


  return (
    <div className='VaccineRegTab'>

        <form>
            <label>Search</label>          

            <input type='text' value={searchQuery} onChange={e=> setSearchQuery(e.target.value)} />     
        </form>


        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine Name</th>
                    <th>Manufactured Date</th>
                    <th>Expire Date</th>
                    <th>Quantity</th>
                    <th>Notes</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {filteredVaccineData && filteredVaccineData.length > 0 ?(                   /*search */
                    filteredVaccineData.map((vaccine)=>(
                        <tr key={vaccine._id}>
                            <td>{vaccine.vname}</td>
                            <td>{vaccine.manf_date}</td>
                            <td>{vaccine.expi_Date}</td>
                            <td>{vaccine.quantity}</td>
                            <td>{vaccine.notes}</td>
                            
                        
                        <td className='actionButtons'>
                            <button  >Edit</button>
                        </td>

                        <td onClick={() => deletevaccinedata(vaccine._id)} className='deleteButtons'>
                            <button >Delete</button>
                        </td>
    
                    </tr>

                    ))

                ):(
                    <tr>
                        <td>You have not added any vaccine data</td>
                    </tr>
                )}
               
            </tbody>
        </table>
        </div>
  )
}

export default VaccineRegTab

