import { useState } from "react";
import ReactDom from 'react-dom';
import './Form.css';

export default function BusinessSetup({onClose, displayed}){
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [services, setServices] = useState([]);
    


    function storeBusinessName(e){
        const name = e.target.value;
        setBusinessName(name);
    }
    function storeAddress(e){
        const address = e.target.value;
        setAddress(address);
    }
    function storeDescription(e){
        const description = e.target.value;
        setBusinessDescription(description);
    }//set business details

    function addService(e){
        e.preventDefault()
        let newService = {name: '', price: '', description: ''}
        setServices([...services, newService])
    }
    function deleteService(e, index){
        e.preventDefault()
        const deleteService = [...services];
        deleteService.splice(index, 1);
        setServices(deleteService);
    }
    function setServiceName(e, index){
        const serviceName = e.target.value;
        const serviceArray = [...services];
        serviceArray[index].name = serviceName;
        setServices(serviceArray);
    }
    function setPrice(e, index){
        const servicePrice = e.target.value;
        const serviceArray = [...services];
        serviceArray[index].price = servicePrice;
        setServices(serviceArray);
    }
    function setServiceDescription(e, index){
        const serviceDescription = e.target.value;
        const serviceArray = [...services];
        serviceArray[index].description = serviceDescription;
        setServices(serviceArray);
    }//set services 




    function handleSubmit(){
        const business = {businessName, address, businessDescription};
        const serviceArray = {services};
        const createBusiness = async () => {
            const businessCreated = await fetch('http://localhost:8000/create-business',
                {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(business),
                    credentials: 'include'
                })
            const response = (await businessCreated.json());
        }
        const addServices = async () => {
            const servicesAdded= await fetch('http://localhost:8000/add-services',
                {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(serviceArray),
                    credentials: 'include'
                })
            const response = (await servicesAdded.json());
        }
        createBusiness();
        addServices();
        
    }

    if(!displayed) return null
    return ReactDom.createPortal(
        <div className="modal_form_container">
            <div className="button_form_container">
                <button onClick={onClose} className='material-symbols-outlined close_form'>close</button>
                <form onSubmit={handleSubmit} className='modal_form'>
                    <div className='form_content'>
                        <h1 className='create_header'>Setup Your Business</h1>
                        <hr />
                        <label htmlFor='business_name'>Business Name</label><br />
                        <input 
                            type='text'
                            placeholder='Enter Your Business Name'
                            name='business_name'
                            className='form_input'
                            onBlur={ storeBusinessName }
                            required/>
                        <br />

                        <label htmlFor='address'>Business Address</label><br />
                        <input 
                            type='text'
                            placeholder='Enter Your Business Address'
                            name='address'
                            className='form_input'
                            onBlur={ storeAddress }
                            required/>
                        <br />

                        <label htmlFor='business_description'>Business Description</label><br />
                        <textarea 
                            type='text'
                            placeholder='Describe your business'
                            className='text_area'
                            name='business_description'
                            onBlur={ storeDescription }
                            required/>
                        <br />

                        <label htmlFor='services'>Services</label><br />
                        <hr />
                        {services.map((service, index) => {
                            return(
                                <div className="service_container" key={index}>
                                    <div className="service_creation">
                                        <label htmlFor='service_name'>Service Name</label>
                                        <input 
                                            type='text' 
                                            name='service_name' 
                                            className='service_input'
                                            value={service.name}
                                            onChange={(e) => setServiceName(e, index)}
                                        />
                                    </div>
                                    <div className="service_creation">
                                        <label htmlFor='price'>Price</label>
                                        <div className='input_container'>
                                            <p className='input_desc'>$</p>
                                            <input 
                                                type='number' 
                                                name='price' id='' 
                                                className='price_input' 
                                                min={0} 
                                                max={9999.99}
                                                value={service.price}                            
                                                onChange={(e) => setPrice(e, index)}
                                            />
                                        </div>
                                    </div>
                                    <div className="service_creation">
                                        <label htmlFor='service_time'>Description (optional)</label>
                                        <textarea 
                                            type='text' 
                                            name='description'
                                            value={service.description}
                                            onChange={(e) => setServiceDescription(e, index)}
                                        />
                                    </div>
                                    <button  onClick={(e) => deleteService(e, index)} className='material-symbols-outlined delete' value={index}>delete</button>
                                </div>
                            )
                        })}
                        <div className="add_service_container">
                            <button onClick={addService} className='material-symbols-outlined add_service_button'>add</button>
                            <p className='add_service'>Add A Service</p>
                        </div>
                        <br />
                        <button type='submit' className='submit_info'>Create Business</button>
                        <hr data-content='or'/>
                    </div>
                </form>
            </div>
            
        </div>,
        document.getElementById('business_setup_portal')
    )
}