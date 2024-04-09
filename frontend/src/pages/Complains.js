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
    yaddress: '',
    images: [],
    ctype: '',
    /*otherDocument: [],*/
    cdesc: '',
    date: '',
    area: '',
    location : ''
  });


  const addComplain = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      // Prepare the request payload
      const formdata = new FormData();
      formdata.append('fname', formData.fname);
      formdata.append('lname', formData.lname);
      formdata.append('mobile', formData.mobile);
      formdata.append('email', formData.email);
      formdata.append('NIC', formData.NIC);
      formdata.append('date', formData.date);
      formdata.append('yaddress', formData.yaddress);
      formdata.append('ctype', formData.ctype);
      formdata.append('cdesc', formData.cdesc);
      formdata.append('area', formData.area);
      formdata.append('location', formData.location);

      // Append each image file to FormData
      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          formdata.append('images', formData.images[i]);
        }
    }
    
    console.log(formdata.get('images'));
      // Make Axios POST request to the backend API endpoint
      const response = await Axios.post('http://localhost:4000/api/addComplain', formdata, {
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
      images: files,

    }));
    
  };

  return (
    <Layout>
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
            <Form.Group >
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group >
              <Form.Label>NIC:</Form.Label>
              <Form.Control type="text" name="nic" value={formData.NIC} onChange={(e) => setFormData({ ...formData, NIC: e.target.value })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group >
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" name="address" value={formData.yaddress} onChange={(e) => setFormData({ ...formData, yaddress: e.target.value })} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group >
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value.toString() })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group >
              <Form.Label>Photo:</Form.Label>
              <Form.Control type="file" name="photo" onChange={handleImageChange} multiple />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group >
              <Form.Label>Complain Type:</Form.Label>
              <Form.Control as="select" name="complainType" value={formData.ctype} onChange={(e) => setFormData({ ...formData, ctype: e.target.value })} required>
                <option value="dengue">Dengue</option>
                <option value="food">Food</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group >
              <Form.Label>Other Document:</Form.Label>
              <Form.Control type="file" name="otherDocument"  multiple />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group >
              <Form.Label>Complain Details:</Form.Label>
              <Form.Control as="textarea" rows={4} name="complainDetails" value={formData.cdesc} onChange={(e) => setFormData({ ...formData, cdesc: e.target.value })} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group >
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
    </Layout>
  );
};

export default ComplaintForm;