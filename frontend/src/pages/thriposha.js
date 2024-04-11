import React, { useEffect, useState } from 'react'
import '../styles/thriposha.css'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';

const Thriposha = ({submitted,data}) => {

    const[ttype,setttype] = useState('');
    const[test_date,settest_date]= useState('');
    const[tquantity,settquantity]=useState(0);

    useEffect(()=>{
        if(!submitted){
            setttype('');
            settest_date('');
            settquantity('');
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0 ){
            setttype(data.type);
            settest_date(data.esti_Date);
            settquantity(data.quantity);
        }
    },[data]);

    const addthriposha = async() =>{
        try{
            const response=await Axios.post('http://localhost:4000/api/addTDis',{
                type : ttype,
                esti_Date:test_date,
                quantity:tquantity,
            });
            console.log('Successfully',response.data);
        }catch(error){
            console.error('error',error);
        }
    }
    
  return (
    <Layout>
    <div>
    <div className='Ttitle'>

    <h3 >Thriposha Destribution</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Thriposha Type</label>
            <input onChange={e=>setttype(e.target.value)} type='text' id='bname' autoComplete='off' placeholder='Thriposha Type'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Estimated Date</label>
            <input onChange={e=>settest_date(e.target.value.toString())} type='date' id='age' autoComplete='off' placeholder='Estimated Date'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Quantity</label>
            <input onChange={e=>settquantity(e.target.value)} type='text' id='weight' autoComplete='off' placeholder='Quantity'/>
        </div>


        <button className='tbsubmit' type='submit'>Cancel</button>

        <Link to="/Thriposhatable">
            <button onClick={addthriposha} className='tbsave'type='submit'>Save</button>
        </Link>

    </form>
    
    </div>
    </div>
    </Layout>
  )
}

export default Thriposha