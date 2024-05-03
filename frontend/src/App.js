import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Vaccines from './pages/Vaccines';
import VaccineReg from './pages/VaccineReg';
import VaccineApp from './pages/VaccineApp';
import VaccineRequest from './pages/VaccineRequest';
import Staff from './pages/Staff';
import Leave from './pages/Leave';
import DengueAssignTable from './pages/DengueAssignTable';
import VaccineAssignTable from './pages/VaccineAssignTable';
import RaidsAssign from './pages/RaidsAssignTable';
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
import VaccineRegTab from './pages/VaccineRegTab';
import VaccineAppTab from './pages/VaccineAppTab';
import VaccineRequestTab from './pages/VaccineRequestTab';
import DengCampTab from './pages/DengCampTab';
import Dengueschedules from './pages/Dengueschedules';
import Vaccineschedules from './pages/Vaccineschedules';
import Raidsschedules from './pages/Raidsschedules';
import LeaveTable from './pages/LeaveTable';
import StaffLogin from './pages/StaffLogin';
import FCDMTable from './pages/FCDMTable';
import ComplaintForm from './pages/Complains';
import Complainstable from './pages/Complainstable';
import ComplainsHome from './pages/ComplainsHome';
import RaidForm from './pages/RaidForm';
import EditLeave from './pages/EditLeave';
import FCRVTable from './pages/FCRVTable';
import AdminClinic from './pages/AdminClinic';
import UpdateClinic from './pages/UpdateClinic';
import PatientReport from './pages/PatientReport';
import DoctorLogin from './Auth/DoctorLogin';
import Lgportal from './Auth/Lgportal';
import ModelPopup from './pages/ModelPopup';
import Raids from './pages/Raids';
import RaidSubForm from './pages/RaidSubForm';
import DengueHomePage from './pages/DengueHomePage';
import Denguemap from './pages/Denguemap';
import FCDMEdit from './pages/FCDMEdit';
import { AnimatePresence } from 'framer-motion';
import Editbabydetails from './pages/Editbabydetails';
import Editbabyvaccination from './pages/Editbabyvaccination';
import Edittriposha from './pages/Edittriposha';

import EditVReg from './pages/EditVReg';
import EditVApp from './pages/EditVApp';


import FCRFEdit from './pages/FCRFEdit';

import RaidSubTable from './pages/RaidSubTable';
import RaidFormTable from './pages/RaidFormTable';
import RaidFormEdit from './pages/RaidFormEdit';
import RaidsHome from './pages/RaidsHome';

import RaidSubFormEdit from './pages/RaidSubFormEdit';
import FCRS from './pages/FCRS';
import FCNotify from './pages/FCNotify';


import Editcampdetails from './pages/Editcampdetails';
import Upcomp from './pages/UpdateComplain';




function App() {
  return (
    <AnimatePresence>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/vaccines' element={<Vaccines />} />
          <Route path='/vaccinereg' element={<VaccineReg />} />
          <Route path='/VaccineApp' element={<VaccineApp />} />
          <Route path='/VaccineRequest' element={<VaccineRequest />} />

          <Route path='/VaccineRegTab' element={<VaccineRegTab />} />
          <Route path='/vaccineapptab' element={<VaccineAppTab />} />
          <Route path='/VaccineRequestTab' element={<VaccineRequestTab />} />

          <Route path='/staff' element={<Staff />} />
          <Route path='/Leave' element={<Leave />} />
          <Route path='/Dengueschedules' element={<Dengueschedules />} />
          <Route path='/Vaccineschedules' element={<Vaccineschedules />} />
          <Route path='/Raidsschedules' element={<Raidsschedules />} />
          <Route path='/LeaveTable' element={<LeaveTable />} />
          <Route path='/StaffLogin' element={<StaffLogin />} />
          <Route path="/" element={<LeaveTable />} />
          <Route path="/EditLeave/:id" element={<EditLeave />} />
          <Route path='/DengueAssignTable' element={<DengueAssignTable />} />
          <Route path='/VaccineAssignTable' element={<VaccineAssignTable />} />

          <Route path='/vaccines' element={<Vaccines />} />
          <Route path='/vaccinereg' element={<VaccineReg />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/Leave' element={<Leave />} />
          <Route path='/Dengueschedules' element={<Dengueschedules />} />
          <Route path='/Vaccineschedules' element={<Vaccineschedules />} />
          <Route path='/Raidsschedules' element={<Raidsschedules />} />
          <Route path='/LeaveTable' element={<LeaveTable />} />
          <Route path='/StaffLogin' element={<StaffLogin />} />
          <Route path="/EditLeave/:id" element={<EditLeave />} />
          <Route path='/DengueAssignTable' element={<DengueAssignTable />} />
          <Route path='/VaccineAssignTable' element={<VaccineAssignTable />} />
          <Route path='/RaidsAssign' element={<RaidsAssign />} />
          <Route path='/Fine-And-court' element={<FineAndCourt />} />
          <Route path='/Fine-And-court-Submit-Reports' element={<FCReportForm />} />
          <Route path='/Fine-And-court-Document-Management' element={<FCDocManage />} />
          <Route path='/DengueAssignTable' element={<DengueAssignTable />} />
          <Route path='/VaccineAssignTable' element={<VaccineAssignTable />} />
          <Route path='/RaidsAssign' element={<RaidsAssign />} />
          <Route path='/Fine-And-court' element={<FineAndCourt />} />
          <Route path='/Fine-And-court-Submit-Reports' element={<FCReportForm />} />
          <Route path='/Fine-And-court-Document-Management' element={<FCDocManage />} />
          <Route path='/Fine-And-court-Analyse' element={<FCAnalyse />} />
          <Route path='/clinics' element={<Clinics />} />
          <Route path='/mainMidwife' element={<MainMidwife />} />
          <Route path='/babyDetails' element={<BabyDetails />} />
          <Route path='/babyVaccination' element={<BabyVaccination />} />
          <Route path='/thriposha' element={<Thriposha />} />
          <Route path='/Babytable' element={<Babytable />} />
          <Route path='/Bvaccinetable' element={<Bvaccinetable />} />
          <Route path='/Thriposhatable' element={<Thriposhatable />} />
          <Route path='/VaccineRegTab' element={<VaccineRegTab />} />
          <Route path='/DengCampTab' element={<DengCampTab />} />
          <Route path='/F&CDocumentManagementTabe' element={<FCDMTable />} />


          <Route path='/RF' element={<RaidForm />} />
          <Route path='/F&CDReportViolationTabe' element={<FCRVTable />} />

          <Route path='/RF' element={<RaidForm />} />
          <Route path='/F&CDReportViolationTabe' element={<FCRVTable />} />
          <Route path='/DengueAssignTable' element={<DengueAssignTable />} />



          <Route path='/addclinics' element={<AddClinic />} />
          <Route path='/dengueCli' element={<Dengue />} />
          <Route path='/raids' element={<Raids />} />
          <Route path='/raidform' element={<RaidForm />} />
          <Route path='/raidformtable' element={< RaidFormTable />} />
          <Route path='/raidsubform' element={< RaidSubForm />} />
          <Route path='/raidsubtable' element={< RaidSubTable />} />




          <Route path='/dengueCli' element={<Dengue />} />
          <Route path='/raids' element={<Raids />} />
          <Route path='/raidform' element={<RaidForm />} />
          <Route path='/raidformtable' element={< RaidFormTable />} />
          <Route path='/raidsubform' element={< RaidSubForm />} />
          <Route path='/raidsubtable' element={< RaidSubTable />} />



          <Route path='/addpatients/:_id/:date/:venue/:ctype' element={<AddPatients />} />

          <Route path='/dengueCli' element={<Dengue />} />
          <Route path='/dentalCli' element={<Dental />} />
          <Route path='/adminClinics' element={<AdminClinic />} />
          <Route path='/genPatientReport' element={<PatientReport />} />

          <Route path='/Complains' element={<ComplaintForm />} />
          <Route path='/denguecamp' element={<DengueCampaigns />} />



          <Route path='/clinics' element={<Clinics />} />
          <Route path='/mainMidwife' element={<MainMidwife />} />
          <Route path='/babyDetails' element={<BabyDetails />} />
          <Route path='/babyVaccination' element={<BabyVaccination />} />
          <Route path='/thriposha' element={<Thriposha />} />
          <Route path='/Babytable' element={<Babytable />} />
          <Route path='/Bvaccinetable' element={<Bvaccinetable />} />
          <Route path='/Thriposhatable' element={<Thriposhatable />} />
          <Route path='/VaccineRegTab' element={<VaccineRegTab />} />
          <Route path='/DengCampTab' element={<DengCampTab />} />
          <Route path='/F&CDocumentManagementTabe' element={<FCDMTable />} />
          <Route path='/RF' element={<RaidForm />} />
          <Route path='/F&CDReportViolationTabe' element={<FCRVTable />} />


          <Route path='/addclinics' element={<AddClinic />} />

          <Route path='/updateCli/:_id/:date/:venue/:ctype' element={<UpdateClinic />} />
          <Route path='/dengueCli' element={<Dengue />} />
          <Route path='/dentalCli' element={<Dental />} />
          <Route path='/adminClinics' element={<AdminClinic />} />
          <Route path='/genPatientReport' element={<PatientReport />} />

          <Route path='/Complains' element={<ComplaintForm />} />
          <Route path='/denguecamp' element={<DengueCampaigns />} />



          <Route path='/clinics' element={<Clinics />} />
          <Route path='/mainMidwife' element={<MainMidwife />} />
          <Route path='/babyDetails' element={<BabyDetails />} />
          <Route path='/babyVaccination' element={<BabyVaccination />} />
          <Route path='/thriposha' element={<Thriposha />} />
          <Route path='/Babytable' element={<Babytable />} />
          <Route path='/Bvaccinetable' element={<Bvaccinetable />} />
          <Route path='/Thriposhatable' element={<Thriposhatable />} />
          <Route path='/Editbabydetails/:_id/:bname/:age/:weight/:co_no/:notes/:BDate/:Gname' element={<Editbabydetails />} />
          <Route path='/Editbabyvaccination/:_id/:type/:esti_Date/:quantity' element={<Editbabyvaccination />} />
          <Route path='/Edittriposha/:_id/:type/:esti_Date/:quantity' element={<Edittriposha />} />

          <Route path='/DengCampTab' element={<DengCampTab />} />
          <Route path='/dengueCli' element={<Dengue />} />
          <Route path='/RF' element={<RaidForm />} />
          <Route path='/Complains' element={<ComplaintForm />} />
          <Route path='/denguecamp' element={<DengueCampaigns />} />

          <Route path='/Editcampdetails/:_id/:venue/:date/:time/:etime/:drName' element={<Editcampdetails />} />
          <Route path='/Editcampdetails/:_id/:venue/:date/:time/:drName' element={<Editcampdetails />} />


          <Route path='/Fine-And-court' element={<FineAndCourt />} />
          <Route path='/Fine-And-court-Submit-Reports' element={<FCReportForm />} />
          <Route path='/Fine-And-court-Document-Management' element={<FCDocManage />} />
          <Route path='/F&CDReportViolationTabe' element={<FCRVTable />} />
          <Route path='/F&CDocumentManagementTabe' element={<FCDMTable />} />

          <Route path='/FCDMEdit/:_id/:r_id/:ro_name/:date/:v_name/:v_type' element={<FCDMEdit />} />
          <Route path='/F&CReportViolationTabe' element={<FCRVTable />} />
          <Route path="/FCRVEdit/:_id/:ro_name/:ro_email/:ro_mobile/:date/:v_location/:v_type/:v_description/:v_name/:v_nic/:v_mobile/:v_email" element={<FCRFEdit />} />

          <Route path='/Fine-And-court-Analyse' element={<FCAnalyse />} />
          <Route path='/' element={<Home />} />
          <Route path='/vaccines' element={<Vaccines />} />
          <Route path='/vaccinereg' element={<VaccineReg />} />
          <Route path='/VaccineApp' element={<VaccineApp />} />
          <Route path='/VaccineRequest' element={<VaccineRequest />} />
          <Route path='/VaccineRegTab' element={<VaccineRegTab />} />
          <Route path='/vaccineapptab' element={<VaccineAppTab />} />
          <Route path='/VaccineRequestTab' element={<VaccineRequestTab />} />
          <Route path='/EditVReg/:_id/:vname/:manf_date/:expi_Date/:quantity/:notes' element={<EditVReg />} />
          <Route path='/EditVApp/:_id/:v_name/:quantity/:date/:location' element={<EditVApp />} />

          <Route path='/ComplainsHome' element={<ComplainsHome />} />

          <Route path='/staff' element={<Staff />} />
          <Route path='/Leave' element={<Leave />} />
          <Route path='/Dengueschedules' element={<Dengueschedules />} />
          <Route path='/Vaccineschedules' element={<Vaccineschedules />} />
          <Route path='/Raidsschedules' element={<Raidsschedules />} />
          <Route path='/LeaveTable' element={<LeaveTable />} />
          <Route path='/StaffLogin' element={<StaffLogin />} />
          <Route path="/EditLeave/:id" element={<EditLeave />} />
          <Route path='/DengueAssignTable' element={<DengueAssignTable />} />
          <Route path='/VaccineAssignTable' element={<VaccineAssignTable />} />
          <Route path='/RaidsAssign' element={<RaidsAssign />} />
          <Route path='/clinics' element={<Clinics />} />
          <Route path='/mainMidwife' element={<MainMidwife />} />
          <Route path='/babyDetails' element={<BabyDetails />} />
          <Route path='/babyVaccination' element={<BabyVaccination />} />
          <Route path='/thriposha' element={<Thriposha />} />
          <Route path='/Babytable' element={<Babytable />} />
          <Route path='/Bvaccinetable' element={<Bvaccinetable />} />
          <Route path='/Thriposhatable' element={<Thriposhatable />} />
          <Route path='/addclinics' element={<AddClinic />} />
          <Route path='/dengueCli' element={<Dengue />} />
          <Route path='/raids' element={<Raids />} />
          <Route path='/raidform' element={<RaidForm />} />
          <Route path='/raidsubform' element={<RaidSubForm />} />


          <Route path='/dengueCli' element={<Dengue />} />
          <Route path='/dentalCli' element={<Dental />} />
          <Route path='/adminClinics' element={<AdminClinic />} />
          <Route path='/genPatientReport' element={<PatientReport />} />
          <Route path='/Complains' element={<ComplaintForm />} />
          <Route path='/Complainstable' element={<Complainstable />} />
          <Route path='/denguecamp' element={<DengueCampaigns />} />
          <Route path='/Fine-And-court' element={<FineAndCourt />} />
          <Route path='/Fine-And-court-Submit-Reports' element={<FCReportForm />} />
          <Route path='/Fine-And-court-Document-Management' element={<FCDocManage />} />
          <Route path='/F&CDReportViolationTabe' element={<FCRVTable />} />
          <Route path='/F&CDocumentManagementTabe' element={<FCDMTable />} />
          <Route path='/Fine-And-court-Analyse' element={<FCAnalyse />} />
          <Route path='/FCDMEdit/:_id/:r_id/:ro_name/:date/:v_name/:v_type' element={<FCDMEdit />} />
          <Route path='/EditLeave/:_id/:name/:staffid/:email/:position/:doleave/:leavestrt/:leaveend/:leaveType' element={<EditLeave />} />
          <Route path='/DengueHomePage' element={<DengueHomePage />} />
          <Route path='/Denguemap' element={<Denguemap />} />
          <Route path='/dclogin' element={<DoctorLogin />} />
          <Route path='/login' element={<Lgportal />} />
          <Route path='/popup' element={<ModelPopup />} />
          <Route path='/RaidFormEdit/:_id/:location/:date/:time/:officer/:sNote' element={<RaidFormEdit />} />
          <Route path='/RaidSubFormEdit/:_id/:location/:details/:sNote' element={<RaidSubFormEdit />} />
          <Route path='/RaidsHome' element={<RaidsHome />} />
          <Route path='/FCRS' element={<FCRS />} />
          <Route path='/FCNotify' element={<FCNotify />} />
          <Route path='/updateComp/:_id/:fname/:lname/:mobile/:email/:NIC/:yaddress/:ctype/:cdesc' element={<Upcomp />} />
        </Routes>
      </Router>
    </AnimatePresence>




  )

}

export default App;
