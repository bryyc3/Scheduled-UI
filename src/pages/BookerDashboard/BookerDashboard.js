import Navbar from '../../components/Navbar/Navbar.js';
import { useEffect } from 'react';
import ApptSquare from '../../components/ApptSquare/ApptSquare.js';
import './BookerDashboard.css';

export default function BookerDashboard(){
    useEffect(() => {
        fetch("http://localhost:8000/loginStatus",
          {
            method: 'GET',
            credentials: 'include'
          }
        ).then((res) => res.json())
          .then(data => {
            (data.logged_in && data.account_type === 'booker') ? console.log(data.logged_in) : window.location = `http://localhost:3000/`
          })},[])
    return(
        <>
            <Navbar />
            <div className='content_background'>
                <ApptSquare />
                <h1 className='no_appts_message'>No other appointments scheduled</h1>
            </div>
            <div className='content_background'>
                
            </div>
        </>
        
    );
}