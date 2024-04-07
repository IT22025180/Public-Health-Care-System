import React, { useEffect, useState } from 'react'
import '../styles/babytable.css'
import  Axios  from 'axios';
const Babytable = () => {

    const [babydata,setbabydata]=useState([]);
    
    useEffect(()=>{
        getbabydata();
    },[]);

    const getbabydata =()=>{
        Axios.get('http://localhost:4000/api/baby')
        .then(response=>{
            console.log('data from sever',response.data);
            setbabydata(response.data.allBabies);
        })
        .catch(error=>{
            console.error("Axios error:",error);
        })
    }

    //delete
    const babyDdelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteBaby', { _id: id })
            .then(response => {
                console.log('Babydata deleted successfully');
                setbabydata(prevData => prevData.filter(baby => baby._id !== id));
            })
            .catch(error => {
                console.error('Error deleting babydata:', error);
      });
};
    

  return (
    <div className='babytable'>
        
        <form >
        <button type="submit" class="search-button">Search</button>
    </form>
 
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Baby Name</th>
                    <th>Age(Year)</th>
                    <th>Weight(Kg)</th>
                    <th>Contact Number</th>
                    <th>Special Notes</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {babydata && babydata.length > 0 ?(
                    babydata.map((baby)=>(
                <tr key={baby._id}>
                    <td>{baby.bname}</td>
                    <td>{baby.age} </td>
                    <td>{baby.weight}</td>
                    <td>{baby.co_no}</td>
                    <td>{baby.notes}</td>

                  
                    <td className='actionButtons'>
                        <button >Edit</button>
                    </td>
                    
                    <td  className='deleteButtons'>
                        <button onClick={()=> babyDdelete(baby._id)}>Delete</button>
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
    </div>
  )
}

export default Babytable