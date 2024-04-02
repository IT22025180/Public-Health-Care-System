import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Vaccines from './pages/Vaccines';
import VaccineReg from './pages/VaccineReg';
import { Sidebar } from "react-pro-sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/vaccines' element = {<Vaccines/>}/>
        <Route path='/vaccinereg' element = {<VaccineReg/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
