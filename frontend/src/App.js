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
import MainMidwife from './pages/mainMidwife';
import BabyDetails from './pages/babyDetails';
import BabyVaccination from './pages/babyVaccination';
import Thriposha from './pages/thriposha';
import Babytable from './pages/Babytable';
import Bvaccinetable from './pages/Bvaccinetable';
import Thriposhatable from './pages/Thriposhatable';
import AddPatients from './pages/AddPatients';
import DengueCampaigns from './pages/DengueCampaignSchedule';
import DengCampTab from './pages/DengCampTab';
import Dengueschedules from './pages/Dengueschedules';
import Vaccineschedules from './pages/Vaccineschedules';
import Raidsschedules from './pages/Raidsschedules';
import LeaveTable from './pages/LeaveTable';
import StaffLogin from './pages/StaffLogin';
import ComplaintForm from './pages/Complains';
import RaidForm from './pages/RaidForm';


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
        <Route path='/Dengueschedules' element = {<Dengueschedules/>}/>
        <Route path='/Vaccineschedules' element = {<Vaccineschedules/>}/>
        <Route path='/Raidsschedules' element = {<Raidsschedules/>}/>
        <Route path='/LeaveTable' element={<LeaveTable/>}/>
        <Route path='/StaffLogin' element={<StaffLogin/>}/>
        
        <Route path='/Fine-And-court' element = {<FineAndCourt/>}/>
        <Route path='/Fine-And-court-Submit-Reports' element = {<FCReportForm/>}/>
        <Route path='/Fine-And-court-Document-Management' element = {<FCDocManage/>}/>
        <Route path='/Fine-And-court-Analyse' element = {<FCAnalyse/>}/>
        <Route path='/clinics' element = {<Clinics/>}/>
        <Route path='/mainMidwife' element={<MainMidwife/>}/>
        <Route path='/babyDetails' element={<BabyDetails/>}/>
        <Route path='/babyVaccination' element={<BabyVaccination/>}/>
        <Route path='/thriposha' element={<Thriposha/>}/>
        <Route path='/Babytable' element={<Babytable/>}/>
        <Route path='/Bvaccinetable' element={<Bvaccinetable/>}/>
        <Route path='/Thriposhatable' element={<Thriposhatable/>}/>
        <Route path='/DengCampTab' element={<DengCampTab/>}/>
        <Route path='/RF' element={<RaidForm/>}/>
        

        <Route path='/addclinics' element = {<AddClinic/>}/>
        <Route path='/addpatients' element = {<AddPatients/>}/>
        <Route path='/dengueCli' element = {<Dengue/>}/>
        <Route path='/dentalCli' element = {<Dental/>}/>
        
        <Route path='/Complains' element = {<ComplaintForm/>}/>
        <Route path='/denguecamp' element = {<DengueCampaigns/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
