import React, { useEffect, useState } from 'react'
import '../styles/RaidFormTable.css'
import Axios from 'axios';

const RaidFormTable = () => {
    //state variables
    const[formtabledata,setformtabledata]=useState([]);
    

    



    useEffect(()=>{
        getformtabledata();
    },[]);

    const getformtabledata =()=>{
        Axios.get('http://localhost:4000/api/RaidForm')
        .then(response => {
            console.log('data from server',response.data);
            setformtabledata(response.data.allRaidForm);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }


    //delete

    const deleteformtabledata = (id) => {
        Axios.post('http://localhost:4000/api/deleteRSub',{_id: id})
        .then(response =>{
            console.log('Table Data deleted successfully');
            setformtabledata(prevData => prevData.filter(formtable=>formtable._id !== id));
        })
        .catch(error =>{
            console.error('Error deleting formtabledata:',error);
        })
    }



    //update




  

  return (
    <div className='FormtableTab'>

    

        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Officer</th>
                    <th>specialnotes</th>

                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {formtabledata && formtabledata.length > 0 ?(                  
                    formtabledata.map((formtable)=>(
                        <tr key={formtable._id}>
                            <td>{formtable.location}</td>
                            <td>{formtable.date}</td>
                            <td>{formtable.time}</td>
                            <td>{formtable.officer}</td>
                            <td>{formtable.specialno}</td>
                            
                        
                        <td className='actionButtons'>
                            <button  >Edit</button>
                        </td>
                        <td onClick={() => deleteformtabledata(formtable._id)} className='deleteButtons'>
                            <button >Delete</button>
                        </td>
    
                    </tr>

                    ))

                ):(
                   <tr>
                       <td>You have not added any Raid Data</td>
                    </tr>
                )}
               
            </tbody>
        </table>
        </div>
  )
}

export default RaidFormTable
