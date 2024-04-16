import React, { useEffect, useState } from 'react'
import '../styles/thriposhatable.css'
import Axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Thriposhatable = () => {

    const[thriposhadata,setthriposhadata]=useState([]);
    const navigate = useNavigate();

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
            thriposhaDelete(id);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
            });
        }
    });
};
//generate report
    const generatePDF = () => {
        if (thriposhadata.length === 0) {
            console.log("No data to generate PDF.");
            return;
        }
        const doc = new jsPDF();
        let y = 10;
        thriposhadata.forEach((thriposha, index) => {
            const thriposhaText = `Thriposha Type: ${thriposha.type}\nEstimated Date: ${thriposha.esti_Date}\nQuantity: ${thriposha.quantity}\n\n`;
            doc.text(thriposhaText, 10, y);
            y += 30;
        });
        doc.save("thriposha_report.pdf");
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
                    {thriposha._id && thriposha.type && thriposha.esti_Date && thriposha.quantity  && (
                        <button onClick={() => navigate(`/Edittriposha/${thriposha._id}/${thriposha.type}/${thriposha.esti_Date}/${thriposha.quantity}`)}>Edit</button>
                    )}
                    </td>
                    <td className='deleteButtons'>
                        <button onClick={() => confirmDelete(thriposha._id)} >Delete</button>
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

        <button className='generate' onClick={generatePDF}>Generate Report</button>
    </div>
  )
}

export default Thriposhatable