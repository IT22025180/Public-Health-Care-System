import Layout from '../components/Layout'
import '../styles/Complains.css'
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    nic: '',
    address: '',
    date: '',
    photos: [],
    complainType: 'dengue',
    otherDocument: [],
    complainDetails: '',
    area: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoChange = (e) => {
    setFormData({
      ...formData,
      photos: e.target.files
    });
  };

  const handleDocumentChange = (e) => {
    setFormData({
      ...formData,
      otherDocument: e.target.files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, such as sending data to the server
    console.log(formData);
    alert('Complaint submitted successfully!');
  };

  return (
    <Container>
      <h1>Public Health Complaint Form</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile:</Form.Label>
              <Form.Control type="tel" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="nic">
              <Form.Label>NIC:</Form.Label>
              <Form.Control type="text" name="nic" value={formData.nic} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="date">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="photo">
              <Form.Label>Photo:</Form.Label>
              <Form.Control type="file" name="photo" onChange={handlePhotoChange} multiple />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="complainType">
              <Form.Label>Complain Type:</Form.Label>
              <Form.Control as="select" name="complainType" value={formData.complainType} onChange={handleChange} required>
                <option value="dengue">Dengue</option>
                <option value="raid">Raid</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="otherDocument">
              <Form.Label>Other Document:</Form.Label>
              <Form.Control type="file" name="otherDocument" onChange={handleDocumentChange} multiple />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="complainDetails">
              <Form.Label>Complain Details:</Form.Label>
              <Form.Control as="textarea" rows={4} name="complainDetails" value={formData.complainDetails} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="area">
              <Form.Label>Select Area:</Form.Label>
              {/* Implement your map selection component here */}
              <Form.Control type="text" name="area" value={formData.area} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ComplaintForm;