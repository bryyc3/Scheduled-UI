import { useState, useEffect } from "react";
import BusinessSetup from "../Forms/BusinessSetup";
import './BusinessDashboard.css';

export default function BusinessDashboard(){
    const [businessData, setBusinessData] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    function toggleForm() {
        setDisplayForm(!displayForm);
    }
    useEffect(() =>{
        const getBusinessData = async () => {
            const response = await fetch("http://localhost:8000/business-information",
                {
                    method: 'GET',
                    credentials: 'include'
                }
            )
            const businessInfo = (await response.json());
            console.log(businessInfo)
            setBusinessData(businessInfo);
       }
       getBusinessData();
    },[])
    if(businessData.length == 0){
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
            <h1 className='profile_prev_header'>Profile Preview</h1>
            <div className="profile_prev">
                <h1 className='business_name'></h1>
                <h2 className='business_location'></h2>
                <p className='business_desc'></p>
                <div className='services'>

                </div>
            </div>
        </>
    )
}