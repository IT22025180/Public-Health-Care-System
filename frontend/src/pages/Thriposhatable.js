import React, { useEffect, useState } from 'react'
import '../styles/thriposhatable.css'
import Axios from 'axios';

const Thriposhatable = () => {

    const[thriposhadata,setthriposhadata]=useState([]);

    useEffect(()=>{
        getthriposhadata();
    },[]);

    const getthriposhadata =()=>{
        Axios.get('http://localhost:4000/api/Triposha')
        .then(response=>{
            console.log('data from sever',response.data);
            setthriposhadata(response.data.allTDis);
        })
        .catch(error=>{
            console.error('Axios error :',error);
        })
    }

    //delete
    const thriposhaDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteTDis', { _id: id })
            .then(response => {
                console.log('thriposha deleted successfully');
                setthriposhadata(prevData => prevData.filter(thriposha => thriposha._id !== id));
            })
            .catch(error => {
                console.error('Error deleting thriposha:', error);
      });
};

  return (
    <div className='thriposhatable'>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Thriposha Type</th>
                    <th>Estimated Date</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {thriposhadata && thriposhadata.length > 0 ?(
                    thriposhadata.map((thriposha)=>(
                <tr key={thriposha._id}>
                    <td>{thriposha.type}</td>
                    <td>{thriposha.esti_Date} </td>
                    <td>{thriposha.quantity}</td>

                    <td className='actionButtons'>
                        <button>Edit</button>
                    </td>
                    <td className='deleteButtons'>
                        <button onClick={() => thriposhaDelete(thriposha._id)} >Delete</button>
                    </td>
                </tr>
                    ))
                    ):(
                        <tr>
                            <td>You have not baby data</td>
                        </tr>  
                )}
            </tbody>
        </table>

        <button  className='generate'>Generate Report</button>
    </div>
  )
}

export default Thriposhatable