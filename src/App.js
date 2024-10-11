import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro/Intro.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';
import ScheduleAppointment from './pages/ScheduleAppointment/ScheduleAppointment.js';
import Dashboard from './pages/Dashboard/DashBoard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Intro />} />
        <Route exact path='/create-account' element={<CreateAccount />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/schedule-appointment' element={<ScheduleAppointment />} />
      </Routes>
    </Router>
   
  );
}

export default App;