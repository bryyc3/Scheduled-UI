import Navbar from '../../components/Navbar/Navbar.js';
import { useState, useEffect } from 'react';
import Appointments from '../../components/Appointments/Appointments.js';
import './BookerDashboard.css';

export default function BookerDashboard(){
    const [accountType, setAccountType] = useState('')
    useEffect(() => {
       const getLoginInfo = async () => {
            const response = await fetch("http://localhost:8000/loginStatus",
                {
                    method: 'GET',
                    credentials: 'include'
                }
            )
            const loginInfo = (await response.json());
            if(!loginInfo.logged_in || loginInfo.account_type !== 'booker'){
                 window.location = `http://localhost:3000/`
            }
            setAccountType(loginInfo.account_type);
       }
       getLoginInfo();
       
    },[])//Check for user login status
    return(
        <>
            <Navbar />
            <div className='content_background'>
               <Appointments dashboard = {accountType} />
            </div>
        </>
        
    );
}