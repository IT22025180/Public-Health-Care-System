import React, { useEffect, useState } from 'react';
import '../styles/Dengcamptab.css';
import Axios from 'axios';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { Link, useNavigate ,useParams } from 'react-router-dom';
import logo1 from '../webImages/logo1.png';
import DengueCampaigns from './DengueCampaignSchedule';


const DengCampTab = () => {
    const [campdata,setcampdata]=useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        getcampdata();
    },[]);

    const getcampdata =()=>{
        Axios.get('http://localhost:4000/api/camp')
        .then(response => {
            console.log('data from server',response.data);
            setcampdata(response.data.allCampaign);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }

    const campDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteCamp', { _id: id })
            .then(response => {
                console.log('Campaign data deleted successfully');
                setcampdata(prevData => prevData.filter(camp => camp._id !== id));
            })
            .catch(error => {
                console.error('Error deleting campdata:', error);
      });
};

const filteredcampdata = campdata.filter(camp=> {

    return camp.date?.toLowerCase().includes(searchQuery.toLowerCase());

});

const generateReport = () => {
    if (filteredcampdata.length === 0) {
        console.log("No camp data to generate report.");
        return;
    }

    const doc = new jsPDF();
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
    doc.text('Dengue Campaign Summary', 60, 60); // Adjust the position as needed
    let y = 75;

    filteredcampdata.forEach((camp, index) => {
        const campText = `Venue: ${camp.venue}\nDate: ${camp.date}\nStarting Time: ${camp.time}\nConducted By: ${camp.drName}\n\n`;
        doc.text(campText, 10, y);
        y += 30;
    });

    doc.save("camp_report.pdf");
};

  return (
    <div className='Dcamptable'>
         <form className= "campsearch_bar">
         <input  placeholder="Search by date" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
         </form>
        <table border ={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Starting time</th>
                    <th>Conducted by</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Generate PDF</th>
                </tr>
            </thead>
            <tbody>
             {filteredcampdata && filteredcampdata.length > 0 ? (
                filteredcampdata.map((camp)=>(
                <tr key={camp._id}>
                    <td>{camp.venue}</td>
                    <td>{camp.date}</td>
                    <td>{camp.time}</td>
                    <td>{camp.drName}</td>
                    <td className='actionButtons'>
                                    <Link to={`/Editcampdetails/${camp._id}/${camp.venue}/${camp.date}/${camp.time}/${camp.drName}`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>
                    <td className='deleteButtons'>
                        <button onClick={()=> campDelete(camp._id)}>Delete</button>
                    </td>
                    <td className='reportButtons'>
                    <button onClick={generateReport}>Generate Report</button>
                    </td>
                </tr>))
            ):(
                <tr>
                    <td>You have not camp data</td>
                </tr>
             )}   
               
            </tbody>
        </table>
        </div>
  )
}

export default DengCampTab;