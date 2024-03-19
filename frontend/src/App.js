import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FCReportForm from './pages/FCReportForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/FineAndCourt' element = {<FCReportForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
