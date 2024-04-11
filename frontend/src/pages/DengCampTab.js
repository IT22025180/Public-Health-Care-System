import React, { useEffect, useState } from 'react';
import '../styles/Dengcamptab.css';
import Axios from 'axios';
import jsPDF from 'jspdf';

const DengCampTab = () => {
    const [campdata,setcampdata]=useState([]);

    const [searchQuery, setSearchQuery] = useState('');

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
    let y = 10;

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
         <input  placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
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
                        <button  >Edit</button>
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

export default DengCampTab