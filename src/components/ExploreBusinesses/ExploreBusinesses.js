import { useState, useEffect } from 'react';
import ViewBusiness from '../ViewBusiness/ViewBusiness';
import './ExploreBusinesses.css';

export default function ExploreBusinesses(){
    const [businesses, setBusinesses] = useState([]);
    const [displayBusiness, setDisplayBusiness] = useState(false);
    const [businessObj, setBusinessObj] = useState({});

    const getBusinesses = async () => {
        const businessesResponse = await fetch("http://localhost:8000/get-businesses",
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        const businessesArr= (await businessesResponse.json());
        setBusinesses(businessesArr);
   }
   function storeBusinessData(businessInfo){
        setBusinessObj(businessInfo);
        toggleBusinessView();
   }
   function toggleBusinessView(){
        setDisplayBusiness(!displayBusiness);
   }
   
    useEffect(() =>{
       getBusinesses();
    },[])
    return(
        <>
            <div className="explore_cont">
                <h1 className='explore_businesses_header'>Explore Businesses</h1>
                <div className='businesses_cont'>
                    {businesses.map((business, index) =>{
                        return(
                            <div className='business_cont'>
                                <h1>{business.business_name}</h1>
                                <h2>{business.location}</h2>
                                <h2>{business.description}</h2>
                                <button className='view_business_btn' onClick={(e) => storeBusinessData(business)}>View</button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id='business_view_portal'>
                <ViewBusiness
                    displayed={displayBusiness} 
                    onClose={toggleBusinessView}
                    businessData={businessObj}
                />
            </div>
        </>
    )
}