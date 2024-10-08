import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../components/Background/Background';
import LoginForm from '../../components/Forms/LoginForm';
import './Intro.css';

export default function Intro(){
  const [displayForm, setDisplayForm] = useState(false);

  function toggleForm() {
      setDisplayForm(!displayForm);
  }

  const getLoginInfo = async () => {
    const response = await fetch("http://localhost:8000/loginStatus",
        {
            method: 'GET',
            credentials: 'include'
        }
    )
    const loginInfo = (await response.json());
    if(loginInfo.logged_in){
         window.location = `http://localhost:3000/dashboard`
    }
  }//Check for user login status 

  useEffect(() => {
    getLoginInfo();
  },[])

  return (
    <>
      <Background />
      <div className='login_content'>
        <h1 className='scheduled_title'>SCHEDULED</h1>
        <p className='subheader'>Booking appointments made easy</p>
        <Link to="/create-account" className='create_account'>Create Account</Link>
        <h3 className='existing_account'>Have an account?</h3>
        <button onClick={ toggleForm } className='login_prompt'>Login</button>
        <div id='login_portal'>
          <LoginForm 
              displayed={displayForm} 
              onClose={ toggleForm }
                />
        </div>
      </div>
    </>  
  );
}