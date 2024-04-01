import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FineAndCourt from './pages/FineAndCourt';
import FCReportForm from './pages/FCReportForm';
import FCDocManage from './pages/FCDocManage';
import Clinics from './pages/Clinics';
import Dengue from './pages/DengueCli';
import Dental from './pages/DentalCli';
import AddClinic from './pages/AddClinic';
import FCAnalyse from './pages/FCAnalyse';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/Fine-And-court' element = {<FineAndCourt/>}/>
        <Route path='/Fine-And-court-Submit-Reports' element = {<FCReportForm/>}/>
        <Route path='/Fine-And-court-Document-Management' element = {<FCDocManage/>}/>
        <Route path='/Fine-And-court-Analyse' element = {<FCAnalyse/>}/>
        <Route path='/clinics' element = {<Clinics/>}/>
      </Routes>
    </Router>
  );
}

export default App;
