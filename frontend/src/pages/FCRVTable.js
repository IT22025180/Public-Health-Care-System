import { useEffect, useState } from "react";
import '../styles/FCRVTable.css';
import Layout from '../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo1 from '../webImages/logo1.png';
import { Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';

const FCRVTable = () => {
  const [RVdata, setRVdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = () => {
    Axios.get('http://localhost:4000/api/VioReports')
      .then(response => {
        console.log('Data from Server', response.data);
        setRVdata(response.data.allVioReports);
      })
      .catch(error => {
        console.error('Axios Error : ', error);
      });
  };

  const deletereport = (id) => {
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
        Axios.post('http://localhost:4000/api/deleteVioR', { _id: id })
          .then(() => {
            setRVdata(prevData => prevData.filter(RVdata => RVdata._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error Delete Document', error);
          });
      }
    });
  };

  const FilterData = () => {
    return RVdata.filter(rvdata => {
      const searchQueryLower = searchQuery.toLowerCase();
      const includesSearchQuery = (value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(searchQueryLower);
        }
        return false;
      };

      return includesSearchQuery(rvdata.ro_name) ||
        includesSearchQuery(rvdata.ro_email) ||
        includesSearchQuery(rvdata.ro_mobile) ||
        includesSearchQuery(rvdata.date) ||
        includesSearchQuery(rvdata.v_location) ||
        includesSearchQuery(rvdata.v_type) ||
        includesSearchQuery(rvdata.v_name) ||
        includesSearchQuery(rvdata.v_email) ||
        includesSearchQuery(rvdata.v_mobile) ||
        includesSearchQuery(rvdata.v_nic);
    });
  };

  const GenReport = () => {
    const doc = new jsPDF('landscape');
  
    const logo = new Image();
    logo.src = logo1;
    doc.addImage(logo, 'PNG', 20, 10, 20, 20);
  
    // Add header text
    doc.setFontSize(12);
    doc.text('Public Health Information System', 45, 15);
    doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 45, 20);
    doc.text('Colombo 10, Sri Lanka.', 45, 25);
    doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 45, 30);
  
    
    doc.text('', 45, 35);
  
    // Generate the table
    doc.autoTable({
      head: [['Raid Officer Name', 'Raid Officer Email', 'Raid Officer Contact Number', 'Date', 'Violation Location', 'Violation Type', 'Violation Description', 'Violator Name', 'Violator Email', 'Violator Contact Number', 'Violator NIC']],
      body: FilterData().map((val, i) => [val.ro_name, val.ro_email, val.ro_mobile, val.date, val.v_location, val.v_type, val.v_description, val.v_name, val.v_email, val.v_mobile, val.v_nic]),
      startY: 40,
      styles: {
        cellWidth: 'auto',
        fontSize: 8,
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
      },
    });
  
    doc.save('Violation_Report.pdf');
  };


  return (
    <Layout>
      <h2>Violation Report Table</h2>
      <div className="search">
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" />
      </div>
      <div className="FCRVTable">
        <Table border={1} cellPadding={10} cellSpacing={0}>
          <TableHead>
            <TableRow>
              <TableCell>Raid Officer Name</TableCell>
              <TableCell>Raid Officer Email </TableCell>
              <TableCell>Raid Officer Contact Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Violation Location</TableCell>
              <TableCell>Violation Type</TableCell>
              <TableCell>Violation Description</TableCell>
              <TableCell>Violator Name</TableCell>
              <TableCell>Violator Email</TableCell>
              <TableCell>Violator Contact Number</TableCell>
              <TableCell>Violator ID</TableCell>
              <TableCell>Evidences</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FilterData().length > 0 ? (
              FilterData().map((RVdata) => (
                <TableRow key={RVdata._id}>
                  <TableCell>{RVdata.ro_name}</TableCell>
                  <TableCell>{RVdata.ro_email}</TableCell>
                  <TableCell>{RVdata.ro_mobile}</TableCell>
                  <TableCell>{RVdata.date}</TableCell>
                  <TableCell>{RVdata.v_location}</TableCell>
                  <TableCell>{RVdata.v_type}</TableCell>
                  <TableCell>{RVdata.v_description}</TableCell>
                  <TableCell>{RVdata.v_name}</TableCell>
                  <TableCell>{RVdata.v_email}</TableCell>
                  <TableCell>{RVdata.v_mobile}</TableCell>
                  <TableCell>{RVdata.v_nic}</TableCell>
                  <TableCell className="evidence-cell">
                    {Array.isArray(RVdata.evidence) && RVdata.evidence.length > 0 ? (
                      RVdata.evidence.map((evidence, index) => (
                        <div className="imge" key={index} style={{ width: "50px", height: "100px" }}>
                          <img src={`data:${evidence.contentType};base64,${evidence.data}`} alt={`Image`} width={50} height={50} />
                        </div>
                      ))
                    ) : (
                      <span>No evidence</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/FCRVEdit/${RVdata._id}/${RVdata.ro_name}/${RVdata.ro_email}/${RVdata.ro_mobile}/${RVdata.date}/${RVdata.v_location}/${RVdata.v_type}/${RVdata.v_description}/${RVdata.v_name}/${RVdata.v_nic}/${RVdata.v_mobile}/${RVdata.v_email}`}>
                      <button className="rvedtBtn"><FaEdit /></button>
                    </Link>
                    <button className="rvdeleteBtn" onClick={() => deletereport(RVdata._id)}><FaTrash /></button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="14">No Data Available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='genButton'>
        <button onClick={GenReport}>Generate Report</button>
      </div>
    </Layout>
  );
};

export default FCRVTable;
