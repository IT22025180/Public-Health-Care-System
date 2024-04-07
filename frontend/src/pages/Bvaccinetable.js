import React, { useEffect, useState } from 'react'
import '../styles/bvaccinetable.css'
import  Axios  from 'axios'
const Bvaccinetable = () => {

    const[bvaccinedata,setbvaccinedata]=useState([]);

    useEffect(()=>{
        getbvaccinedata();
    },[]);

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

    //delete
    const bvaccineDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteBabyVac', { _id: id })
            .then(response => {
                console.log('Baby vaccine deleted successfully');
                setbvaccinedata(prevData => prevData.filter(bvaccine => bvaccine._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Baby vaccine:', error);
      });
};

  return (
    <div className='Bvaccinetable'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Vaccine Type</th>
                    <th>Estimated Date</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
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
                        <button>Edit</button>
                    </td>
                    <td className='deleteButtons'>
                        
                        <button onClick={() => bvaccineDelete(bvaccine._id)} >Delete</button>

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
  )
}

export default Bvaccinetable