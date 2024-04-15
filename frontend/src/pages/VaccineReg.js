import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from '../components/Header'; 
import '../styles/VaccineReg.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const VaccineReg = ({submitted,data}) => {
    const [vname, setVname] = useState('');
    const [manf_date, setManf_date] = useState('');
    const [expi_Date, setExpi_Date] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!submitted) {
            setVname('');
            setManf_date('');
            setExpi_Date('');
            setQuantity('');
            setNotes('');
            setErrorMessage('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setVname(data.vname);
            setManf_date(data.manf_date);
            setExpi_Date(data.expi_Date);
            setQuantity(data.quantity);
            setNotes(data.notes);
        }
    }, [data]);

    const navtoTable = () => {
        navigate('/VaccineRegTab');
    }

    const addvacc = async () => {
        // Check if any field is empty
        if (!vname || !manf_date || !expi_Date || !quantity || !notes) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

         // Check if quantity is a number
        if (isNaN(quantity)) {
        setErrorMessage("Please enter a valid quantity.");
        return;
    }
    
        // Show SweetAlert confirmation message
        Swal.fire({
            title: "Do you want to save the data?",
            showCancelButton: true,
            confirmButtonText: "Save",
            
        }).then((result) => {
            
            if (result.isConfirmed) {
                // User clicked "Save"
                // Perform API call or any other action here
                saveData(); // Assuming saveData is a function to perform the API call
            } else if (result.isDenied) {
                // User clicked "Don't save", do nothing
            }
        });
    };
    
    const saveData = async () => {
        try {
            const response = await Axios.post('http://localhost:4000/api/addVac', {
                vname: vname,
                manf_date: manf_date,
                expi_Date: expi_Date,
                quantity: quantity,
                notes: notes,
            });
    
            console.log('Successfully', response.data);
    
            // Show success message
            Swal.fire("Saved!", "", "success");
        } catch (error) {
            console.error('error', error);
            // Show error message
            Swal.fire("Error", "Failed to save data", "error");
        }
    };
    
    return (
        <div> 
            <Header />
            <div className='titleVac'>
                <h2 className="head2">Vaccine Registration</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}             
                <form className='addvaccine'>
                    <div className='input'>
                        <label htmlFor='vname'>Vaccine Name :</label>
                        <input onChange={e => setVname(e.target.value)} type='text' id='vname' autoComplete='off' placeholder='Vaccine Name' value={vname} />
                    </div>
                    <div className='input'>
                        <label htmlFor='ManDate'>Manufactured date:</label>
                        <input onChange={e => setManf_date(e.target.value.toString())} type='date' id='ManDate' autoComplete='off' placeholder='Manufactured date' value={manf_date} />
                    </div>
                    <div className='input'>
                        <label htmlFor='ExDate'>Expiration date :</label>
                        <input onChange={e => setExpi_Date(e.target.value.toString())} type='date' id='ExDate' autoComplete='off' placeholder='Expiration date' value={expi_Date} />
                    </div>
                    <div className='input'>
                        <label htmlFor='Quantity'>Quantity :</label>
                        <input onChange={e => setQuantity(e.target.value)} type='text' id='Quantity' autoComplete='off' placeholder='Quantity' value={quantity} />
                    </div>
                    <div className='input'>
                        <label htmlFor='specialnotes'>Special Notes :</label>
                        <input onChange={e => setNotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes' value={notes} />
                    </div>
                    <button onClick={navtoTable} className='bsubmit' type='button'>View vaccines</button>
                    <button onClick={addvacc} className='bsave' type='button'>Save</button>
                </form>
            </div>
        </div>
    )
}
export default VaccineReg;
