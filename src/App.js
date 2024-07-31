import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Doctor_dashbord from './Screens/Doctor_dashbord';
import Login from './Screens/Login';
import Newregis from './Screens/Newregis';
import Patient_dashboard from './Screens/Patient_dashboard';
import "./App.css"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Doctor_dashboard' element={<Doctor_dashbord />}/>
        <Route path='/Patient_dashboard' element={<Patient_dashboard />}/>
        <Route path='/register_newuser' element={<Newregis />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
