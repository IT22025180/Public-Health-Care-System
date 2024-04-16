import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {  useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png'; 
import '../styles/VaccineRegTab.css'

const VaccineRegTab = () => {
  const [vaccinedata, setvaccinedata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  

  useEffect(() => {
    getvaccinedata();
  }, []);




  const getvaccinedata = () => {
    Axios.get('http://localhost:4000/api/Vacccines')
      .then(response => {
        console.log('data from server', response.data);
        setvaccinedata(response.data.allVaccine);
      })
      .catch(error => {
        console.error("Axios error: ", error);
      })
  }

//delete
  const deletevaccinedata = (id) => {
    // Display SweetAlert confirmation dialog
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            // If confirmed, proceed with deletion
            Axios.post('http://localhost:4000/api/deleteVac', { _id: id })
                .then(response => {
                    console.log('Vaccine Data deleted successfully');
                    setvaccinedata(prevData => prevData.filter(vaccine => vaccine._id !== id));
                    // Display success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                })
                .catch(error => {
                    console.error('Error deleting vaccine data:', error);
                });
        }
    });
}



//generate pdf
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Sri Lankan national logo
    const logo = new Image();
    logo.src = logo1; // Use the imported logo image
    doc.addImage(logo, 'PNG', 6, 7, 20, 20); // Adjust the position and dimensions as needed

   
    // Add Public Health Information System as the letterhead
    doc.setFontSize(12);
    doc.text('Public Health Information System', 70, 15); // Adjust the position as needed
    doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 70, 20);
    doc.text('Colombo 10, Sri Lanka.', 70, 25);
    doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 70, 30);

    // Add page border
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(5, 45, 205, 45);

    // Vaccine registration summary topic
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text('Vaccine Registration Summary', 70, 60); // Adjust the position as needed

    // Vaccine registration summary description
    let summaryDescription = '';
    vaccinedata.forEach((vaccine, index) => {
      summaryDescription += `Vaccine Name: ${vaccine.vname}\n`;
      summaryDescription += `Manufactured Date: ${vaccine.manf_date}\n`;
      summaryDescription += `Expire Date: ${vaccine.expi_Date}\n`;
      summaryDescription += `Quantity: ${vaccine.quantity}\n`;
      summaryDescription += `Notes: ${vaccine.notes}\n`;
      summaryDescription += '--------------------------------------------\n';
    });

    doc.setFontSize(12);
    doc.text(summaryDescription, 15, 75);

    // Date and signature
    const currentDate = new Date().toLocaleDateString('en-US');
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 15, 170); 
    doc.text('Signature:', 15, 180); 

    // Save the PDF with a filename
    doc.save('vaccine_registration_summary.pdf');
  }

  const filteredVaccineData = vaccinedata.filter(vaccine => {
    return vaccine.vname.toLowerCase().includes(searchQuery.toLowerCase());
  });



  return (
    <Layout>
      <div className='VaccineRegTab'>
        <form>
          <label>Search</label>
          <input type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </form>
        
        <table border={1} cellPadding={10} cellSpacing={0}>
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
            {filteredVaccineData && filteredVaccineData.length > 0 ? (
              filteredVaccineData.map((vaccine) => (
                <tr key={vaccine._id}>
                  <th>{vaccine.vname}</th>
                  <th>{vaccine.manf_date}</th>
                  <th>{vaccine.expi_Date}</th>
                  <th>{vaccine.quantity}</th>
                  <th>{vaccine.notes}</th>
                  <td className='actionButtons'>
                    {vaccine._id && vaccine.vname && vaccine.manf_date && vaccine.expi_Date && vaccine.quantity && vaccine.notes &&(
                      <button onClick={() => navigate(`/EditVReg/${vaccine._id}/${vaccine.vname}/${vaccine.manf_date}/${vaccine.expi_Date}/${vaccine.quantity}/${vaccine.notes}`)}>Edit</button>
                    )}
                    
                  </td>
                  <td onClick={() => deletevaccinedata(vaccine._id)} className='deleteButtons'>
                    <button>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>You have not added any vaccine data</td>
              </tr>
            )}
          </tbody>
        </table>
        
        <button className="generate" onClick={generatePDF}>Generate PDF</button>
      </div>
    </Layout>
  )
}

export default VaccineRegTab;
