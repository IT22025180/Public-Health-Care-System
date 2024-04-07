import React from "react";
import Layout from "../components/Layout";
import '../styles/RaidForm.css'

const RaidForm = () => {


    return(
        <Layout>
            <div className="form-container">

<form className='form' onSubmit={''}>
  <h2>Report Violation</h2>
  <h4>Raid Officer Information</h4>

  <div className='ROinfo'>
    <div>
      <label>Name:</label>
      <input type="text" name="name" /*value={ROname} onChange={(e) => setROname(e.target.value)}*/ />
    </div>
    <div>
      <label>Email:</label>
      <input type="email" name="email" /*value={Roemail} onChange={(e) => setRoemail(e.target.value)}*/ />
    </div>
    <div>
      <label>Contact Number:</label>
      <input type="Number" name="contactNumber" /*value={ROcontact} onChange={(e) => setROcontact(e.target.value)}*/ />
    </div>
    <div>
      <label>Date:</label>
      <input type="date" name="date" /*value={date} onChange={(e) => setdate(e.target.value)} *//>
    </div>
  </div>


  <h4>Violation Details</h4>
  <div className='Vdetails'>
    <div>
      <label>Location:</label>
      <input type="text" name="location" /*\value={location} onChange={(e) => setlocation(e.target.value)}*/ />
    </div>
    <div>
      <label>Violation Type:</label>
      <div>
        <input type="radio" id="foodViolation" name="type" /*value={foodViolation} onChange={(e) => setfoodViolation(e.target.value)} *//>
        Food Violation
      </div>
      <div>
        <input type="radio" id="dengueViolation" name="type" /*value={dengueViolation} onChange={(e) => setdengueViolation(e.target.value)} *//>
        Dengue Violation
      </div>
    </div>

    <div>
      <label>Violation Description:</label>
      <textarea name="description"/* value={description} onChange={(e) => setdescription(e.target.value)}*/ />
    </div>
  </div>


  <h4>Violator Information</h4>
  <div className='Vinfo'>
    <div>
      <label>Name:</label>
      <input type="text" name="name" /*value={vName} onChange={(e) => setvName(e.target.value)}*/ />
    </div>
    <div>
      <label>Email:</label>
      <input type="email" name="email" /*value={vEmail} onChange={(e) => setvEmail(e.target.value)} *//>
    </div>
    <div>
      <label>Contact Number:</label>
      <input type="Number" name="contactNumber" /*value={vContact} onChange={(e) => setvContact(e.target.value)} *//>
    </div>
    <div>
      <label>ID Number:</label>
      <input type="Number" name="idNumber" /*value={vId} onChange={(e) => setvId(e.target.value)}*/ />
    </div>
  </div>


  <h4>Upload Evidence</h4>
  <div>
    <input type="file" /*value={document} onChange={(e) => setdocument(e.target.value)} multiple*/ />
  </div>
  <button className='button' type="submit">Submit Report</button>
</form>
</div>
</Layout>
);
};

export default RaidForm