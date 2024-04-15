import { useEffect, useState } from "react";
import '../styles/FCRVTable.css';
import Layout from '../components/Layout';
import Axios from "axios";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from "react-router-dom";

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
    const title = "Fine And Court Violation Report";
    const titleMargin = 20;
    const tableMargin = 20;
    const titleWidth = doc.getTextWidth(title);
    const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);
  
    doc.text(title, center, titleMargin);
  
    doc.autoTable({
      head: [['Raid Officer Name', 'Raid Officer Email', 'Raid Officer Contact Number', 'Date', 'Violation Location', 'Violation Type', 'Violation Description', 'Violator Name', 'Violator Email', 'Violator Contact Number', 'Violator NIC']],
      body: FilterData().map((val, i) => [val.ro_name, val.ro_email, val.ro_mobile, val.date, val.v_location, val.v_type, val.v_description, val.v_name, val.v_email, val.v_mobile, val.v_nic]),
      startY: titleMargin + tableMargin,
      styles: {
        cellWidth: 'auto',
        fontSize: 8, // Adjust font size
      },
      columnStyles: {
        0: { cellWidth: 30 }, // Adjust column width
        1: { cellWidth: 30 },
        // Adjust other column widths as needed
      },
    });
  
    doc.save('Fine_And_Court_Violation_Report.pdf');
  };
  

  return (
    <Layout>
      <h2>Violation Report Table</h2>
      <div className="searchvr">
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" />
      </div>
      <div className="FCRVTable">
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Raid Officer Name</th>
              <th>Raid Officer Email </th>
              <th>Raid Officer Contact Number</th>
              <th>Date</th>
              <th>Violation Location</th>
              <th>Violation Type</th>
              <th>Violation Description</th>
              <th>Violator Name</th>
              <th>Violator Email</th>
              <th>Violator Contact Number</th>
              <th>Violator ID</th>
              <th>Evidences</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {FilterData().length > 0 ? (
              FilterData().map((RVdata) => (
                <tr key={RVdata._id}>
                  <td>{RVdata.ro_name}</td>
                  <td>{RVdata.ro_email}</td>
                  <td>{RVdata.ro_mobile}</td>
                  <td>{RVdata.date}</td>
                  <td>{RVdata.v_location}</td>
                  <td>{RVdata.v_type}</td>
                  <td>{RVdata.v_description}</td>
                  <td>{RVdata.v_name}</td>
                  <td>{RVdata.v_email}</td>
                  <td>{RVdata.v_mobile}</td>
                  <td>{RVdata.v_nic}</td>
                  <td>
                    {Array.isArray(RVdata.evidence) && RVdata.evidence.length > 0 && (
                      RVdata.evidence.map((evidence, index) => (
                        <div key={index} style={{ width: "200px", height: "200px" }}>
                          <img src={`data:${evidence.contentType};base64,${evidence.data}`} alt={`Image ${index + 1}`} width={50} height={50} />
                        </div>
                      ))
                    )}
                  </td>

                  <td>
                    <Link to={`/FCRVEdit/${RVdata._id}/${RVdata.ro_name}/${RVdata.ro_email}/${RVdata.ro_mobile}/${RVdata.date}/${RVdata.v_location}/${RVdata.v_type}/${RVdata.v_description}/${RVdata.v_name}/${RVdata.v_nic}/${RVdata.v_mobile}/${RVdata.v_email}`}>
                      <button className="rvedtBtn">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button className="rvdeleteBtn" onClick={() => deletereport(RVdata._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14">No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='genButton'>
        <button onClick={GenReport}>Generate Report</button>
      </div>
    </Layout>
  );
};

export default FCRVTable;
