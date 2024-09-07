import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewUser from './pages/Intro/Intro.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';
import SchedulerDashboard from './pages/SchedulerDashboard/SchedulerDashboard.js';
import BookerDashboard from './pages/BookerDashboard/BookerDashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<NewUser />} />
        <Route exact path='/create-account' element={<CreateAccount />} />
        <Route exact path='/scheduler/dashboard' element={<SchedulerDashboard />} />
        <Route exact path='/booker/dashboard' element={<BookerDashboard />} />
      </Routes>
    </Router>
   
  );
}

export default App;