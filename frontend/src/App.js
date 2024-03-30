import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import Home from './pages/Home';

import FineAndCourt from './pages/FineAndCourt';
import FCReportForm from './pages/FCReportForm';

import Staff from './pages/Staff';
import FCDocManage from './pages/FCDocManage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/staff' element = {<Staff/>}/>
        <Route path='/Fine-And-court' element = {<FineAndCourt/>}/>
        <Route path='/Fine-And-court-Submit-Reports' element = {<FCReportForm/>}/>
        <Route path='/Fine-And-court-Document-Management' element = {<FCDocManage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
