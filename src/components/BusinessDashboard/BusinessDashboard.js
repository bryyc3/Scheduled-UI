import { useState, useEffect } from "react";
import BusinessSetup from "../Forms/BusinessSetup";
import EditServices from "../EditServices/EditServices";
import BookServices from "../BookServices/BookServices";
import EditAvailability from "../EditAvailability/EditAvailability";

import './BusinessDashboard.css';

export default function BusinessDashboard({account, business}){
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
   }//scheduler specific fetch for business info

    useEffect(() =>{
        if(account === 'scheduler'){
            getSchedulerBusinessData();
        }
    },[])
    if(account === 'scheduler'){
        if(businessData == null && account === 'scheduler'){
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
                    <EditServices />
                    <EditAvailability />
                    <h1>Time Slot Divisions</h1>
                    <h2>Show a time slot for every {businessData.divide_slots} mins</h2>
                </div>
            </>
        )
    }
    if(account === 'booker'){
        return(
            <>
                <div className="business_cont">
                    <div className="business_info">
                        <h1 className='business_name'>{businessData.business_name}</h1>
                        <p className='business_location'>{businessData.location}</p>
                        <p className='business_desc'>{businessData.description}</p>
                    </div>
                    <hr />
                    <BookServices schedulerBusiness={business} />
                </div>
            </>
        )
    }
}