import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.js";
import Appointments from "../../components/Appointments/Appointments.js";
import BusinessDashboard from "../../components/BusinessDashboard/BusinessDashboard.js";
import ExploreBusinesses from '../../components/ExploreBusinesses/ExploreBusinesses.js';
import './Dashboard.css';

export default function Dashboard(){
    const [accountType, setAccountType] = useState('');

    const getLoginInfo = async () => {
        const response = await fetch("http://localhost:8000/loginStatus",
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        const loginInfo = (await response.json());
        if(!loginInfo.logged_in){
             window.location = `http://localhost:3000/`
        }
        setAccountType(loginInfo.account_type);
   }//Check for user login status

    useEffect(() => {
       getLoginInfo();
    },[])

    if(accountType === 'booker'){
        return(
            <>
                <Navbar account = {accountType}/>
                <div className='content_background'>
                <Appointments dashboard = {accountType} />
                </div>
                <div className='content_background'>
                <ExploreBusinesses />
                </div>
            </>
            
        );
    }

    if(accountType === 'scheduler'){
        return(
            <>
                <Navbar account = {accountType}/>
                <div className='content_background appointments'>
                <Appointments dashboard = {accountType} />
                </div>
                <div className='content_background'>
                <BusinessDashboard />
                </div>
            </>
        );
    }

}