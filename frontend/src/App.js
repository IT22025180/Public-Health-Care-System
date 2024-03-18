import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Vaccines from './pages/Vaccines';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/vaccines' element = {<Vaccines/>}/>
      </Routes>
    </Router>
  );
}

export default App;
