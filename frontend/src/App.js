import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Vaccines from './pages/Vaccines';
import VaccineReg from './pages/VaccineReg';
import Staff from './pages/Staff';
import { Sidebar } from "react-pro-sidebar";
import Leave from './pages/Leave';
import  Allschedules  from './pages/Allschedules';

import FineAndCourt from './pages/FineAndCourt';
import FCReportForm from './pages/FCReportForm';
import FCDocManage from './pages/FCDocManage';
import Clinics from './pages/Clinics';
import Dengue from './pages/DengueCli';
import Dental from './pages/DentalCli';
import AddClinic from './pages/AddClinic';
import FCAnalyse from './pages/FCAnalyse';
import AddPatients from './pages/AddPatients';
import DengueComplaints from './pages/DengueComplaints';
import DengueCampaigns from './pages/DengueCampaignSchedule';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/vaccines' element = {<Vaccines/>}/>
        <Route path='/vaccinereg' element = {<VaccineReg/>}/>
        
        <Route path='/staff' element = {<Staff/>}/>
        <Route path='/Leave' element = {<Leave/>}/>
        <Route path='/Allschedules' element = {<Allschedules/>}/>


        <Route path='/Fine-And-court' element = {<FineAndCourt/>}/>
        <Route path='/Fine-And-court-Submit-Reports' element = {<FCReportForm/>}/>
        <Route path='/Fine-And-court-Document-Management' element = {<FCDocManage/>}/>
        <Route path='/Fine-And-court-Analyse' element = {<FCAnalyse/>}/>
        <Route path='/clinics' element = {<Clinics/>}/>
        <Route path='/addclinics' element = {<AddClinic/>}/>
        <Route path='/addpatient' element = {<AddPatients/>}/>
        <Route path='/dengue' element = {<DengueComplaints/>}/>
        <Route path='/denguecamp' element = {<DengueCampaigns/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
