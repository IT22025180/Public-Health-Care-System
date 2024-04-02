import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
<<<<<<< HEAD
import Staff from './pages/Staff';
import { Sidebar } from "react-pro-sidebar";
import Leave from './pages/Leave';
import  Allschedules  from './pages/Allschedules';

=======
import FineAndCourt from './pages/FineAndCourt';
import FCReportForm from './pages/FCReportForm';
import FCDocManage from './pages/FCDocManage';
import Clinics from './pages/Clinics';
import Dengue from './pages/DengueCli';
import Dental from './pages/DentalCli';
import AddClinic from './pages/AddClinic';
import FCAnalyse from './pages/FCAnalyse';
>>>>>>> c4ec7e98a4b17060d709099124c061dec4675299


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
<<<<<<< HEAD
        <Route path='/staff' element = {<Staff/>}/>
        <Route path='/Leave' element = {<Leave/>}/>
        <Route path='/Allschedules' element = {<Allschedules/>}/>


=======
        <Route path='/Fine-And-court' element = {<FineAndCourt/>}/>
        <Route path='/Fine-And-court-Submit-Reports' element = {<FCReportForm/>}/>
        <Route path='/Fine-And-court-Document-Management' element = {<FCDocManage/>}/>
        <Route path='/Fine-And-court-Analyse' element = {<FCAnalyse/>}/>
        <Route path='/clinics' element = {<Clinics/>}/>
>>>>>>> c4ec7e98a4b17060d709099124c061dec4675299
      </Routes>
    </Router>
  );
}

export default App;
