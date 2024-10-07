import { useState, useEffect } from "react";
import './BusinessServices.css';

export default function BusinessServices(){
    const [services, setServices] = useState([]);
    
    const getBusinessServices = async () => {
        const response = await fetch("http://localhost:8000/business-services",
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        const businessServices= (await response.json());
        setServices(businessServices);
   }
   
    useEffect(() => {
       getBusinessServices();
    },[])
    return(
        services.map((service, index) => {
            return(
                <>
                    <div className='service' key={index}>
                        <div className='service_name_description'>
                            <h1 className='service_name'>{service.service}</h1>
                            <h3 className='service_description'>{service.description}</h3>
                        </div>
                        <h2 className='service_price'>${service.price}</h2>
                    </div>
                    <hr />
                </>
            )
        })
    )
}