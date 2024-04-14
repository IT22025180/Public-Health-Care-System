import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import Layout from '../components/Layout';
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png'; 
import Swal from 'sweetalert2'; 
import '../styles/Leave.css';

const LeaveTable = () => {
  const navigate = useNavigate();
  const [leavedata, setLeavedata] = useState([]);

  useEffect(() => {
    getLeavedata();
  }, []);

  const getLeavedata = () => {
    Axios.get('http://localhost:4000/api/Leave')
      .then(response => {
        console.log('data from server', response.data);
        setLeavedata(response.data.allLeave);
      })
      .catch(error => {
        console.error("Axios error:", error);
      });
  };

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post('http://localhost:4000/api/deleteLeave', { _id: id })
          .then(response => {
            console.log('Leave deleted successfully');
            setLeavedata(prevData => prevData.filter(leave => leave._id !== id));
            // Display success message
            Swal.fire({
              title: "Deleted!",
              text: "Your leave application has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error deleting leave:', error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle cancel action
        Swal.fire({
          title: "Cancelled",
          text: "Your leave is safe ",
          icon: "error"
        });
      }
    });
  };

  const generatePDF = (leave) => {
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

    // Leave summary topic
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text('Leave Summary', 90, 60); // Adjust the position as needed

    // Professional summary description
    let leaveTypeDescription = '';
    switch (leave.leaveType) {
      case 'Sick':
        leaveTypeDescription = 'medical reasons';
        break;
      case 'Vacation':
        leaveTypeDescription = 'personal reasons';
        break;
      case 'Quitting':
        leaveTypeDescription = 'resignation';
        break;
      default:
        leaveTypeDescription = 'reasons unknown';
        break;
    }

    let positionDescription = '';
    switch (leave.position) {
      case 'Doctor':
        positionDescription = 'Doctor';
        break;
      case 'Nurse':
        positionDescription = 'Nurse';
        break;
      case 'PHI':
        positionDescription = 'Public Health Inspector';
        break;
      default:
        positionDescription = 'position unknown';
        break;
    }

    const leaveStartDate = new Date(leave.leavestrt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const leaveEndDate = new Date(leave.leaveend).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const description = `
    ${positionDescription} ${leave.name}, with Staff ID ${leave.staffid}, will be on leave for ${leaveTypeDescription} 

    from ${leaveStartDate}, to ${leaveEndDate}. During this period, ${positionDescription} ${leave.name},

    who holds the position of ${positionDescription}, will not be available for duty. 


    This leave has been approved due to health concerns, as indicated by the ${leave.leaveType.toLowerCase()} 

    leave type. We wish ${positionDescription} ${leave.name} a swift recovery and look forward to 

    their return to full health and work responsibilities thereafter.
    `;

    doc.setFontSize(12);
    doc.text(description, 15, 75); 

    // Date and signature
    const currentDate = new Date().toLocaleDateString('en-US');
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 15, 170); 
    doc.text('Signature:', 15, 180); 

    // Save the PDF with a filename based on leave name
    doc.save(`Leave_Summary_${leave.name}.pdf`);
  };

  return (
    <Layout>
      <div className='LeaveTable'>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Staff ID</th>
              <th>Email</th>
              <th>Position</th>
              <th>Leaves For</th>
              <th>Leave Start</th>
              <th>Leave End</th>
              <th>Leave Type</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {leavedata && leavedata.length > 0 ? (
              leavedata.map((leave) => ( 
                <tr key={leave._id}>
                  <td>{leave.name}</td>
                  <td>{leave.staffid}</td>
                  <td>{leave.email}</td>
                  <td>{leave.position}</td>
                  <td>{leave.doleave}</td>
                  <td>{leave.leavestrt}</td>
                  <td>{leave.leaveend}</td>
                  <td>{leave.leaveType}</td>
                 
                  <td className='actionButtons'>
                  <Link to={`/EditLeave/${leave._id}/${leave.name}/${leave.staffid}/${leave.email}/${leave.position}/${leave.doleave}/${leave.leavestrt}/${leave.leaveend}/${leave.leaveType}`}>

                    <button className="editButton">Edit</button>
                    </Link>
                  </td>
                 
                  <td className='actionButtons'> 
                    <button className="deleteButton" onClick={() => handleDelete(leave._id)}>Delete</button>
                  </td>
                  <td className='actionButtons'> 
                    <button className="pdfButton" onClick={() => generatePDF(leave)}>Generate PDF</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">You have no leave data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default LeaveTable;
