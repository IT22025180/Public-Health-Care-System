import React, { useEffect, useState } from 'react'
import '../styles/babytable.css'
import  Axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Babytable = () => {

    const [babydata,setbabydata]=useState([]);
    //search
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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
            babyDdelete(id);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
            });
        }
    });
};
   
//search
const filteredBabyData = babydata.filter(baby => {
    return baby.bname.toLowerCase().includes(searchQuery.toLowerCase());
});

  return (
    <div className='babytable'>
        
        <form className= "babysearch_bar">
        
        <input  placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
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
            {filteredBabyData && filteredBabyData.length > 0 ? (
                        filteredBabyData.map((baby) =>(
                <tr key={baby._id}>
                    <td>{baby.bname}</td>
                    <td>{baby.age} </td>
                    <td>{baby.weight}</td>
                    <td>{baby.co_no}</td>
                    <td>{baby.notes}</td>

                   
                    <td className='actionButtons'>
                    {baby._id && baby.bname && baby.age && baby.weight  && baby.co_no  && baby.notes  && (
                        <button onClick={() => navigate(`/Editbabydetails/${baby._id}/${baby.bname}/${baby.age}/${baby.weight}/${baby.co_no}/${baby.notes}`)}>Edit</button>
                    )}
                    </td>
                 
                    
                    <td  className='deleteButtons'>
                        <button onClick={()=> confirmDelete(baby._id)}>Delete</button>
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