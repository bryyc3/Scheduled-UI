import { useState, useEffect } from "react";
import AddServices from "../Forms/AddServices";
import ListServices from "../ListServices/ListServices";
import './EditServices.css';

export default function EditServices(){
    const [businessServices, setBusinessServices] = useState([]);
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
        const servicesResponse= (await response.json());
        setBusinessServices(servicesResponse);
   }//scheduler specific fetch request for all services


    useEffect(() => {
        getBusinessServices();
    },[])

    if(businessServices.length === 0){
        return(
            <>
                <h2 className='business_header'>Services Offered</h2>
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
        <>
            <h2 className='business_header'>Services Offered</h2>
            {
                businessServices.map((serviceListing, index) => {
                    return(
                        <>
                            <ListServices service={serviceListing} key={index}/>
                        </>
                    )
                })
            }
        </>
    )
}