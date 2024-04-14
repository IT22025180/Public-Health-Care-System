import { useEffect, useState } from "react";
import '../styles/FCDMTable.css'
import Layout from '../components/Layout';
import Axios from "axios";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ReportStatus = () => {

  const [RVdata, setRVdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getReportData();
  }, []);

  // Read
  const getReportData = () => {
    Axios.get('http://localhost:4000/api/VioReports')
      .then(response => {
        console.log('Data from Server', response.data);
        setRVdata(response.data.allVioReports)
      })
      .catch(error => {
        console.error('Axios Error : ', error)
      })
  }

  // Search
  const FilterData = RVdata.filter(rvdata => {
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

  // Report Generate
  const GenReport = () => {
    const doc = jsPDF('landscape');
    const title = "Fine And Court Violation Report";
    const titleMargin = 20;
    const tableMargin = 20;
    const titleWidth = doc.getTextWidth(title);
    const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);

    doc.text(title, center, titleMargin);

    doc.autoTable({
      head: [['Raid Officer Name', 'Date', 'Violation Location', 'Violation Type', 'Violator Name', 'Violator Email', 'Violator Contact Number', 'Violator NIC', 'Decision']],
      body: RVdata.map((val, i) => [val.ro_name, val.date, val.v_location, val.v_type, val.v_name, val.v_email, val.v_mobile, val.v_nic, val.decision || 'Pending']),
      startY: titleMargin + tableMargin,
    })

    doc.save('Fine_And_Court_Violation_Report_Status.pdf')
  }

  return (
    <Layout>
      <h2>Violation Report Status</h2>
      <div className="searchvr">
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search" />
      </div>
      <div className="FCRVTable">
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Raid Officer Name</th>
              <th>Date</th>
              <th>Violation Location</th>
              <th>Violation Type</th>
              <th>Violation Description</th>
              <th>Violator Name</th>
              <th>Violator Email</th>
              <th>Violator Contact Number</th>
              <th>Violator ID</th>
              <th>Evidences</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            {FilterData && FilterData.length > 0 ? (
              FilterData.map((RVdata) => (
                <tr key={RVdata._id}>
                  <td>{RVdata.ro_name}</td>
                  <td>{RVdata.date}</td>
                  <td>{RVdata.v_location}</td>
                  <td>{RVdata.v_type}</td>
                  <td>{RVdata.v_description}</td>
                  <td>{RVdata.v_name}</td>
                  <td>{RVdata.v_email}</td>
                  <td>{RVdata.v_mobile}</td>
                  <td>{RVdata.v_nic}</td>
                  <td>{RVdata.evidence}</td>
                  <td>{RVdata.decision || 'Pending'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No Data Available</td>
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

export default ReportStatus;
