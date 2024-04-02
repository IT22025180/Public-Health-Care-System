import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Staff from './pages/Staff';
import BabyDetails from './pages/babyDetails';
import BabyVaccination from './pages/babyVaccination';
import Thriposha from './pages/thriposha'; 
import MainMidwife from './pages/mainMidwife';
import Babytable from './pages/Babytable';
import Thriposhatable from './pages/Thriposhatable';
import Bvaccinetable from './pages/Bvaccinetable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
         <Route path='/staff' element = {<Staff/>}/>
         <Route path='/BabyDetails' element = {<BabyDetails/>}/>
         <Route path='/babyvaccination' element={<BabyVaccination />} />
         <Route path='/thriposha' element={<Thriposha />} /> 
         <Route path='/mainmidwife' element={<MainMidwife />} /> 
         <Route path='/Babytable' element={<Babytable/>}/>
         <Route path ='/Thriposhatable' element={<Thriposhatable/>}/>
         <Route path='/Bvaccinetable' element={<Bvaccinetable/>}/>

      </Routes>
    </Router>
  );
}

export default App;
