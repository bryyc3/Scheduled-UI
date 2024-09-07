import { useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../components/Background/Background';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Intro.css';

function Intro(){
  const [displayForm, setDisplayForm] = useState(false);
  function toggleForm() {
      setDisplayForm(!displayForm);
  }
  return (
    <>
      <Background />
      <div className='login_content'>
        <h1 className='scheduled_title'>SCHEDULED</h1>
        <p className='subheader'>Booking appointments made easy</p>
        <Link to="/create-account" className='create_account'>Create Account</Link>
        <h3 className='existing_account'>Have an account?</h3>
        <button onClick={ toggleForm } className='login_prompt'>Login</button>
        <div id='create_account_portal'>
          <LoginForm 
                    displayed={displayForm} 
                    onClose={ toggleForm }
                />
        </div>
        
        
      </div>
    </>  
  );
}

export default Intro;