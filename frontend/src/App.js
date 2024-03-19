import { BrowserRouter as Router, Route, Routes, Form } from 'react-router-dom';
import Home from './pages/Home';

import FineAndCourt from './pages/FineAndCourt';
import FCReportForm from './pages/FCReportForm';

import Staff from './pages/Staff';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>

        <Route path='/FineAndCourt' element = {<FineAndCourt/>}/>
        <Route path='/Fine-And-court-Submit-Reports' element = {<FCReportForm/>}/>

        <Route path='/staff' element = {<Staff/>}/>

      </Routes>
    </Router>
  );
}

export default App;
