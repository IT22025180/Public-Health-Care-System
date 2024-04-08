import { useEffect, useState } from "react";
import '../styles/FCDMTable.css'
import Axios from "axios";
import Swal from "sweetalert2";

const FCDMTable = () => {

  const [DMdata, setDMdata] = useState([]);

  useEffect(() => {
    getDOCMdata();
  }, []);

  const getDOCMdata = () => {
    Axios.get('http://localhost:4000/api/Documents')
      .then(response => {
        console.log('Data from Server', response.data);
        setDMdata(response.data.allDocM)
      })
      .catch(error => {
        console.error('Axios Error : ', error)
      })
  }

  const deleteDocument = (id) => {
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
        Axios.post('http://localhost:4000/api/deleteDocM', { _id: id })
          .then(() => {
            setDMdata(prevData => prevData.filter(ddata => ddata._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error Delete Document', error)
          });
      }
    });
  }


return (
  <div className="FCDMTable">
    <table border={1} cellPadding={10} cellSpacing={0}>
      <thead>
        <tr>
          <th>Report ID</th>
          <th>Raid Officer</th>
          <th>Date</th>
          <th>Violator Name</th>
          <th>Violation Type</th>
          <th>Documents</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {DMdata && DMdata.length > 0 ? (
          DMdata.map((ddata) => (
            <tr key={ddata._id}>
              <td>{ddata.r_id}</td>
              <td>{ddata.ro_name}</td>
              <td>{ddata.date}</td>
              <td>{ddata.v_name}</td>
              <td>{ddata.v_type}</td>
              <td>{ddata.documents}</td>
              <td>
                <button className="edtBtn">Edit</button>
              </td>
              <td>
                <button className="deleteBtn" onClick={() => deleteDocument(ddata._id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No Data Available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default FCDMTable;
