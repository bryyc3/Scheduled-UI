import { useState, useEffect } from "react";
import AddServices from "../Forms/AddServices";
import './BusinessServices.css';

export default function BusinessServices(){
    const [services, setServices] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);

    function toggleForm() {
        setDisplayForm(!displayForm);
    }

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

    if(services.length === 0){
        return(
            <>
                <div className="services_cont">
                    <button className='open_form_button' onClick={ toggleForm }>Add Services</button>
                    <div id='set_services_portal'>
                        <AddServices
                            displayed={displayForm}
                            onClose={toggleForm}
                        />
                    </div>
                </div>  
                <hr />
            </>
           
        )
    };

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