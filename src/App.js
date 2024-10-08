import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewUser from './pages/Intro/Intro.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';
import Dashboard from './pages/Dashboard/DashBoard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<NewUser />} />
        <Route exact path='/create-account' element={<CreateAccount />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
   
  );
}

export default App;