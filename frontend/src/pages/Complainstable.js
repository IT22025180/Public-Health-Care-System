import React, { useEffect, useState } from 'react'
import '../styles/Complains.css'
import  Axios  from 'axios';
const Complainstable = () => {

    const [Complainsdata,setComplainsdata]=useState([]);
    //search
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        getComplainsdata();
    },[]);

    const getComplainsdata =()=>{
        Axios.get('http://localhost:4000/api/Complain')
        .then(response=>{
            console.log('data from sever',response.data);
            setComplainsdata(response.data.allComplain);
        })
        .catch(error=>{
            console.error("Axios error:",error);
        })
    }

    //delete
    const ComplainsDdelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteComplain', { _id: id })
            .then(response => {
                console.log('ComplainData deleted successfully');
                setComplainsdata(prevData => prevData.filter(Complains => Complains._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Complaindata:', error);
      });
};
   
//search
const filteredComplainsData = Complainsdata.filter(Complains => {
    return Complains.fname.toLowerCase().includes(searchQuery.toLowerCase());
});

  return (
    <div className='Complainstable'>
        
        <form className= "Complainssearch_bar">
        
        <input  placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
    </form>
 
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Mobile</th>
                    <th>Emal</th>
                    <th>NIC</th>
                    <th>Address</th>
                    <th>Images</th>
                    <th>Complain Type</th>
                    <th>Description</th>
                    <th>Area</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
            {filteredComplainsData && filteredComplainsData.length > 0 ? (
                        filteredComplainsData.map((Complains) =>(
                <tr key={Complains._id}>
                <td>{Complains.fname}</td>
                <td>{Complains.lname} </td>
                <td>{Complains.email}</td>
                    <td>{Complains.NIC}</td>
                    <td>{Complains.Address}</td>
                    <td>{Complains.images}</td>
                    <td>{Complains.ctype}</td>
                    <td>{Complains.cdesc}</td>
                    <td>{Complains.area}</td>
                    <td>{Complains.location}</td>

                  
                    <td className='actionButtons'>
                        <button >Edit</button>
                    </td>
                    
                    <td  className='deleteButtons'>
                        <button onClick={()=> ComplainsDdelete(Complains._id)}>Delete</button>
                    </td>
                </tr>
                    ))
                    ):(
                        <tr>
                            <td>You have not Complains data</td>
                        </tr>  
                )}

            </tbody>
        </table>
    </div>
  )
}

export default Complainstable