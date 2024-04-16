import Layout from "../components/Layout";
import "../styles/Complains.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";
import Complainstable from "./Complainstable";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapStyle = {
  height: "300px",
  width: "100%",
};

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    NIC: "",
    yaddress: "",
    images: [],
    ctype: null,
    /*otherDocument: [],*/
    cdesc: "",
    date: "",
    area: "",
    location: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const addComplain = async (e) => {
    /* if (!formData.fname || !formData.lname || !formData.mobile || !formData.email || !formData.NIC || !formData.yaddress || !formData.ctype || !formData.cdesc || !formData.date || !formData.area) {
      setErrorMessage('Please fill in all required fields');
      return;
    }*/

    e.preventDefault();

    try {
      console.log(formData);
      // Prepare the request payload
      const formdata = new FormData();
      formdata.append("fname", formData.fname);
      formdata.append("lname", formData.lname);
      formdata.append("mobile", formData.mobile);
      formdata.append("email", formData.email);
      formdata.append("NIC", formData.NIC);
      formdata.append("date", formData.date);
      formdata.append("yaddress", formData.yaddress);
      formdata.append("ctype", formData.ctype);
      formdata.append("cdesc", formData.cdesc);
      formdata.append("area", formData.area);
      formdata.append("location", formData.location);

      // Append each image file to FormData
      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          formdata.append("images", formData.images[i]);
        }
      }

      console.log(formdata.get("images"));
      // Make Axios POST request to the backend API endpoint
      const response = await Axios.post(
        "http://localhost:4000/api/addComplain",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear the form after successful submission
      setFormData({
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        NIC: "",
        date: "",
        yaddress: "",
        images: [],
        ctype: "",
        /*otherDocument: [],*/
        cdesc: "",
        area: "",
        location: "",
      });

      console.log("Data stored successfully", response.data);
      Swal.fire({
        title: "Success !",
        text: "Clinic added successfully",
        icon: "success",
      });
    } catch (error) {
      console.error("Error submitting complain data:", error);
    }
  };
  const [isLoaded, setisLoaded] = useState(false);

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "lk" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };
  useEffect(() => {
    appendScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsjXDyjZfdOrwQeg8OuYqOecH7pMLflto&libraries=places&callback=initMap"
    );
  }, []);

  const DEFAULT_ZOOM = 5;
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyCsjXDyjZfdOrwQeg8OuYqOecH7pMLflto",
  // });

  const [map, setMap] = React.useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 7.8731,
  lng: 80.7718,
  });

  const [defaultLocation, setDefaultLocation] = useState({
    lat: 7.8731,
  lng: 80.7718,
  });

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 7.8731,
  lng: 80.7718,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const appendScript = (scriptToAppend) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    document.body.appendChild(script);
  };
  const loadmap = () => {
    try {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      setisLoaded(true);
      autoCompleteRef.current.addListener('place_changed', () => {
        const place = autoCompleteRef.current.getPlace()
        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
            alert("this location not available");
            return;
        }
        if (place.geometry.viewport || place.geometry.location) {
            // do something
            console.log(place.geometry.location)
        }
        const location = place.geometry.location;
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      setDefaultLocation({ lat: location.lat(), lng: location.lng() });
    
      })
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    console.log(files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handelClickOnMap  = ()=> {

  }

  return (
    <Layout>
      <Container>
        <h1>Public Health Complaint Form</h1>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="mobile">
                <Form.Label>Mobile:</Form.Label>
                <Form.Control
                  type="number"
                  name="mobile"
                  pattern="[0-9]{10}"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>NIC:</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={formData.NIC}
                  onChange={(e) =>
                    setFormData({ ...formData, NIC: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.yaddress}
                  onChange={(e) =>
                    setFormData({ ...formData, yaddress: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value.toString(),
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Photo:</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleImageChange}
                  multiple
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Complain Type:</Form.Label>
                <Form.Control
                  as="select"
                  name="complainType"
                  value={formData.ctype}
                  onChange={(e) =>
                    setFormData({ ...formData, ctype: e.target.value })
                  }
                  required
                >
                  <option value="" selected disabled>
                    Select type
                  </option>
                  <option value="Food">Food</option>
                  <option value="Dengue">Dengue</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Complain Details:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="complainDetails"
                  value={formData.cdesc}
                  onChange={(e) =>
                    setFormData({ ...formData, cdesc: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Select Area:</Form.Label>

                <Form.Control
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  required
                  ref={inputRef}
                  onFocus={loadmap}
                />
                <div>
                  {isLoaded ? (
                    <GoogleMap
                      onLoad={onLoad}
                      center={defaultLocation}
                      zoom={DEFAULT_ZOOM}
                      mapContainerStyle={mapStyle}
                      onClick={handelClickOnMap}
                      onUnmount={onUnmount}
                    >
                      <Marker position={markerPosition} />
                    </GoogleMap>
                  ) : (
                    <></>
                  )}
                </div>
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
