import { useState, useEffect } from "react";
import './SchedulerDashboard.css';
import Appointments from "../../components/Appointments/Appointments.js";

export default function SchedulerDashboard(){
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
            if(!loginInfo.logged_in || loginInfo.account_type !== 'scheduler'){
                 window.location = `http://localhost:3000/`
            }
            setAccountType(loginInfo.account_type);
       }
       getLoginInfo();
       
    },[])//Check for user login status
    return(
        <>
             <div className='content_background'>
               <Appointments dashboard = {accountType} />
            </div>
        </>
    )
}