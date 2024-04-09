import Layout from '../components/Layout'
import '../styles/Complains.css'
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios'
import Swal from 'sweetalert2'

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    NIC: '',
    date: '',
    yaddress: '',
    images: [],
    ctype: '',
    /*otherDocument: [],*/
    cdesc: '',
    area: '',
    location : ''
  });


  const addComplain = async (e) => {
    e.preventDefault();

    try {
      // Prepare the request payload
      const formData = new FormData();
      formData.append('fname', formData.fname);
      formData.append('lname', formData.lname);
      formData.append('mobile', formData.mobile);
      formData.append('email', formData.email);
      formData.append('NIC', formData.NIC);
      formData.append('date', formData.date);
      formData.append('yaddress', formData.yaddress);
      formData.append('ctype', formData.ctype);
      formData.append('cdesc', formData.cdesc);
      formData.append('area', formData.area);
      formData.append('location', formData.location);

      // Append each image file to FormData
      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
            formData.append('images', formData.images[i]);
            console.log(formData.images[i])
        }
    }
    

      // Make Axios POST request to the backend API endpoint
      const response = await Axios.post('http://localhost:4000/api/addComplain', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear the form after successful submission
      setFormData({
        fname: '',
    lname: '',
    mobile: '',
    email: '',
    NIC: '',
    date: '',
    yaddress: '',
    images: [],
    ctype: '',
    /*otherDocument: [],*/
    cdesc: '',
    area: '',
    location : ''
      });

      console.log('Data stored successfully', response.data);
      Swal.fire({
        title: "Success !",
        text: "Clinic added successfully",
        icon: "success"
      })
    } catch (error) {
      console.error('Error submitting complain data:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setFormData((prevData) => ({
      ...prevData,
      photos: files,
    }));
  };

  return (
    <Container>
      <h1>Public Health Complaint Form</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.fname} onChange={(e) => setFormData({ ...formData, fname: e.target.value })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lname} onChange={(e) => setFormData({ ...formData, lname: e.target.value })} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile:</Form.Label>
              <Form.Control type="number" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="nic">
              <Form.Label>NIC:</Form.Label>
              <Form.Control type="text" name="nic" value={formData.NIC} onChange={(e) => setFormData({ ...formData, NIC: e.target.value })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" name="address" value={formData.yaddress} onChange={(e) => setFormData({ ...formData, yaddress: e.target.value })} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="date">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value.toString() })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="photo">
              <Form.Label>Photo:</Form.Label>
              <Form.Control type="file" name="photo" onChange={handleImageChange} multiple />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="complainType">
              <Form.Label>Complain Type:</Form.Label>
              <Form.Control as="select" name="complainType" value={formData.ctype} onChange={(e) => setFormData({ ...formData, ctype: e.target.value })} required>
                <option value="dengue">Dengue</option>
                <option value="food">Food</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="otherDocument">
              <Form.Label>Other Document:</Form.Label>
              <Form.Control type="file" name="otherDocument"  multiple />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="complainDetails">
              <Form.Label>Complain Details:</Form.Label>
              <Form.Control as="textarea" rows={4} name="complainDetails" value={formData.cdesc} onChange={(e) => setFormData({ ...formData, cdesc: e.target.value })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="area">
              <Form.Label>Select Area:</Form.Label>
              {/* Implement your map selection component here */}
              <Form.Control type="text" name="area" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" onClick={addComplain}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ComplaintForm;