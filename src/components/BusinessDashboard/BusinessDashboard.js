import { useState, useEffect } from "react";
import BusinessSetup from "../Forms/BusinessSetup";
import BusinessServices from "../BusinessServices/BusinessServices";
import BusinessAvailability from "../BusinessAvailability/BusinessAvailability";

import './BusinessDashboard.css';

export default function BusinessDashboard(){
    const [businessData, setBusinessData] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    function toggleForm() {
        setDisplayForm(!displayForm);
    }
    const getBusinessData = async () => {
        const businessResponse = await fetch("http://localhost:8000/business-information",
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        const businessInfo = (await businessResponse.json());
        setBusinessData(businessInfo);
   }
    useEffect(() =>{
       getBusinessData();
    },[])
    if(businessData.length === 0){
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
                    <h1 className='business_name'>{businessData[0].business_name}</h1>
                    <p className='business_location'>{businessData[0].location}</p>
                    <p className='business_desc'>{businessData[0].description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio veniam laudantium odio, voluptatibus beatae ipsa commodi, cum blanditiis ut excepturi dolores modi possimus? Soluta aliquam magni in eligendi nesciunt maiores.</p>
                </div>
                <hr />
                <h2 className='business_header'>Services Offered</h2>
                <BusinessServices />
                <h2 className='business_header'>Availability</h2>
                <BusinessAvailability />
            </div>
        </>
    )
}