import React, { useEffect, useState } from 'react'
import '../styles/Complains.css'
import Axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Complainstable = () => {

    const [complainsdata, setComplainsdata] = useState([]);
    //search
    const [searchQuery, setSearchQuery] = useState('');

    const getComplainsdata = () => {
        Axios.get('http://localhost:4000/api/Complain')
            .then(response => {
                console.log('data from sever', response.data);
                setComplainsdata(response.data.allComplain);
            })
            .catch(error => {
                console.error("Axios error:", error);
            })
    }

    useEffect(() => {
        getComplainsdata();
    }, []);

    //delete
    /*
    const ComplainsDdelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteComplain', { _id: id })
            .then(response => {
                console.log('ComplainData deleted successfully');
                setComplainsdata(prevData => prevData.filter(Complains => Complains._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Complaindata:', error);
      });
};*/

    //search
    /*const filteredComplainsData = Complainsdata.filter(Complains => {
        return Complains.fname.toLowerCase().includes(searchQuery.toLowerCase());
    });*/

    console.log(complainsdata.length);
    return (
        <div className='Complainstable'>



            {/*<input placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />*/}

            <TableContainer component={Paper}>
                <Table border={1} cellPadding={10} cellSpacing={0}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Emal</TableCell>
                            <TableCell>NIC</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Images</TableCell>
                            <TableCell>Complain Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Area</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Images</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {complainsdata && complainsdata.length > 0 ? (
                            complainsdata.map((Complains) => (
                                <TableRow key={Complains._id}>
                                    <TableCell>{Complains.fname}</TableCell>
                                    <TableCell>{Complains.lname} </TableCell>
                                    <TableCell>{Complains.email}</TableCell>
                                    <TableCell>{Complains.NIC}</TableCell>
                                    <TableCell>{Complains.Address}</TableCell>
                                    <TableCell>{Complains.images}</TableCell>
                                    <TableCell>{Complains.ctype}</TableCell>
                                    <TableCell>{Complains.cdesc}</TableCell>
                                    <TableCell>{Complains.area}</TableCell>
                                    <TableCell>{Complains.location}</TableCell>
                                    <TableCell>{Complains.images.map((image) => (
                                        <div >
                                            <img src={`complainsdata:${image.contentType};base64,${image.data}`} alt={`Image`} width={50} height={50} />
                                        </div>
                                    ))}</TableCell>


                                    <TableCell >
                                        <Button >Edit</Button>
                                        <Button /*onClick={() => ComplainsDdelete(Complains._id)}*/ >Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell>You have not Complains data</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Complainstable

/**
 * {complainsdata && complainsdata.length > 0 ? (
                            complainsdata.map((Complains) => (
                                <TableRow key={Complains._id}>
                                    <TableCell>{Complains.fname}</TableCell>
                                    <TableCell>{Complains.lname} </TableCell>
                                    <TableCell>{Complains.email}</TableCell>
                                    <TableCell>{Complains.NIC}</TableCell>
                                    <TableCell>{Complains.Address}</TableCell>
                                    <TableCell>{Complains.images}</TableCell>
                                    <TableCell>{Complains.ctype}</TableCell>
                                    <TableCell>{Complains.cdesc}</TableCell>
                                    <TableCell>{Complains.area}</TableCell>
                                    <TableCell>{Complains.location}</TableCell>
                                    <TableCell>{Complains.images.map((image, index) => (
                                        <div key={index}>
                                            <img src={`data:${image.contentType};base64,${image.data}`} alt={`Image ${index}`} />
                                        </div>
                                    ))}</TableCell>


                                    <TableCell >
                                        <Button >Edit</Button>
                                        <Button /*onClick={() => ComplainsDdelete(Complains._id)}*/ /*>Delete</Button>
</TableCell>
</TableRow>
))
) : (
<TableRow>
<TableCell>You have not Complains data</TableCell>
</TableRow>
)}
*/