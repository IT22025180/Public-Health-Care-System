import React, { useEffect, useState } from 'react'
import {} from 'react-bootstrap';
import Layout from '../components/Layout';
import Axios  from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Dengue = () => {

    

    

  return (
    <Layout>
        <div>
        <div className='titles'>
            <h3>Dengue</h3>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Venue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                </TableBody>
              </Table>
            </TableContainer>
            
        </div>
        </div>
    </Layout>
  )
}

export default Dengue;
