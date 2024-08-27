import { Link } from 'react-router-dom';
import IntroBackground from '../../components/Background/IntroBackground';
import './Intro.css';

function Intro(){
  return (
    <>
      <IntroBackground />
      <div className='login_content'>
        <h1 className='scheduled_title'>SCHEDULED</h1>
        <p className='subheader'>Booking appointments made easy</p>
        <Link to="/create-account" className='create_account'>Create Account</Link>
        <h3 className='existing_account'>Have an account?</h3>
        <a href=' ' className='login_prompt'>Login</a>
      </div>
    </>  
  );
}

export default Intro;