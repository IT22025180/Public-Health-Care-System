import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Staff from './pages/Staff';
import BabyDetails from './pages/babyDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
         <Route path='/staff' element = {<Staff/>}/>
         <Route path='/BabyDetails' element = {<BabyDetails/>}/>

      </Routes>
    </Router>
  );
}

export default App;
