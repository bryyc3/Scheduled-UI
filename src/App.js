import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NewUser from './pages/Intro/Intro.js';
import CreateAccount from './pages/CreateAccount/CreateAccount.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<NewUser />} />
        <Route path='/create-account' element={<CreateAccount />} />
      </Routes>
    </Router>
   
  );
}

export default App;