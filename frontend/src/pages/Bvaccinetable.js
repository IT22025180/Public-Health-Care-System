import React, { useEffect, useState } from 'react'
import '../styles/bvaccinetable.css'
import  Axios  from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Bvaccinetable = () => {

    const[bvaccinedata,setbvaccinedata]=useState([]);
    const navigate = useNavigate();

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

const confirmDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            bvaccineDelete(id);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
            });
        }
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
                    {bvaccine._id && bvaccine.type && bvaccine.esti_Date && bvaccine.quantity  && (
                        <button onClick={() => navigate(`/Editbabyvaccination/${bvaccine._id}/${bvaccine.type}/${bvaccine.esti_Date}/${bvaccine.quantity}`)}>Edit</button>
                    )}
                    </td>
                    <td className='deleteButtons'>
                        
                        <button onClick={() => confirmDelete(bvaccine._id)} >Delete</button>

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