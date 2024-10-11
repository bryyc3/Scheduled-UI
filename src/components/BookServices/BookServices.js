import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ListServices from "../ListServices/ListServices";
import './BookServices.css';

export default function BookServices({scheduler}){
    const [servicesArray, setServicesArray] = useState([]);

    const getServices = async () => {
        const response = await fetch("http://localhost:8000/business-services",
            {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                credentials: 'include',
                body: JSON.stringify({userSearch: scheduler})
            }
        )
        const servicesResponse = (await response.json());
        setServicesArray(servicesResponse);
    }//booker specific fetch request for services scheduler offers

    useEffect(() => {
        getServices();
    },[])

    return(
        <>
            <h2 className='business_header'>Services Offered</h2>
            {
                servicesArray.map((serviceListing, index) => {
                    return(
                        <>
                            <ListServices service={serviceListing} key={index}/>
                            <Link to='/schedule-appointment' className='book_service_link' state={serviceListing}><button className='book_service_btn'>Book Service</button></Link>
                            <hr />
                        </>
                    )
                })
            }
        </>
    )
}