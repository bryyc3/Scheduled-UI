import { useState, useEffect } from "react";
import BusinessSetup from "../Forms/BusinessSetup";
import BusinessServices from "../BusinessServices/BusinessServices";
import BusinessAvailability from "../BusinessAvailability/BusinessAvailability";

import './BusinessDashboard.css';

export default function BusinessDashboard({account, name}){
    const [businessData, setBusinessData] = useState({});
    const [displayForm, setDisplayForm] = useState(false);
    function toggleForm() {
        setDisplayForm(!displayForm);
    }
    const getSchedulerBusinessData = async () => {
        const businessResponse = await fetch("http://localhost:8000/business-information",
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        const [businessInfo] = (await businessResponse.json());
        setBusinessData(businessInfo);
   }

   const getBookerBusinessData = async () =>{
        const businessResponse = await fetch("http://localhost:8000/business-information",
            {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                credentials: 'include',
                body: JSON.stringify({userSearch: name})
            }
        )
        const [businessInfo] = (await businessResponse.json());
        setBusinessData(businessInfo);
   }

    useEffect(() =>{
        if(account === 'booker'){
            getBookerBusinessData(); 
        }
        if(account === 'scheduler'){
            getSchedulerBusinessData();
        }
    },[])
    if(businessData.length === 0 && account === 'scheduler'){
        return(
            <>
                <button className='setup_button' onClick={ toggleForm }>Set Up Your Business</button>
                <div id='business_setup_portal'>
                    <BusinessSetup 
                        displayed={displayForm}
                        onClose={toggleForm}
                    />
                </div>
            </>
        )
    }
    return(
        <>
            <div className="business_cont">
                <div className="business_info">
                    <h1 className='business_name'>{businessData.business_name}</h1>
                    <p className='business_location'>{businessData.location}</p>
                    <p className='business_desc'>{businessData.description}</p>
                </div>
                <hr />
                
                <BusinessServices owner={businessData.owner} type={account}/>
                <BusinessAvailability type={account}/>
            </div>
        </>
    )
}