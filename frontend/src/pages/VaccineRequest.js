import React, { useEffect, useState } from "react";
import Layout from "../components/Layout"; 
import '../styles/VaccineRequest.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const VaccineRequest = ({submitted,data}) => {
    const[vName,setvName]=useState('');
    const[quantity,setQuantity]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
   

    const navigate = useNavigate();

    useEffect(()=>{
        if(!submitted){
            setvName('');
            setQuantity('');
            
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setvName(data.vName);
            setQuantity(data.quantity);
            

        }
    },[data]);

    const navtoTable = () => {
        navigate('/VaccineRequestTab');
    }

    const addvacc = async(event)=>{
        event.preventDefault(); // Prevent default form submission//prevent the error message disapearing error

        // Check if any field is empty
        if (!vName || !quantity) {
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
        
        try{
            const response = await Axios.post('http://localhost:4000/api/addVacRq',{
                vName : vName,
                quantity : quantity,
                
            });

            console.log('Successfully',response.data);

            // Show success message
            Swal.fire("Saved!", "", "success");
            
        }catch(error){
            console.error('error',error);
            // Show error message
            Swal.fire("Error", "Failed to save data", "error");
        }
    };

    return(
        <Layout>

        <div>
            
            <div className='title1'>

            <h2 className="he2" >Vaccine Requests</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className='addvaccineRequests'>
                <div className='input'>
                    <label htmlFor='vName'>Vaccine Name :</label>
                    <input onChange={e=>setvName(e.target.value)} type='text' id='vName' autoComplete='off' placeholder='Vaccine Name'/>
                </div>



                <div className='input'>
                    <label htmlFor='quantity'>Quantity :</label>
                    <input onChange={e=>setQuantity(e.target.value)} type='text' id='quantity' autoComplete='off' placeholder='Quantity'/>
                </div>

        

        
            <button onClick={navtoTable} className='bReqView' type='submit'>View vaccines Requests</button>
            
            <button onClick={(e)=>addvacc(e)} className='bReqsave'type='submit'>Save</button>
             

            
            



    </form>
    
    </div>
    </div>
    </Layout>
    )
}
export default VaccineRequest

