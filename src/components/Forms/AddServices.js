import { useState } from "react";
import ReactDom from 'react-dom';
import './Form.css';

export default function AddServices({displayed, onClose}){
    const [services, setServices] = useState([]);

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
    }//set services or delete them

    function handleSubmit(){
        const serviceArray = {services};
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
        addServices();   
    }

    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_form_container'>
            <div className='button_form_container'>
                <button onClick={onClose} className='material-symbols-outlined close_form'>close</button>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <div className='form_content'>
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
                                            <label htmlFor='service_description'>Description (optional)</label>
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
                    </div>
                    <button type='submit' className='submit_info'>Add Services</button>
                </form>
            </div>
        </div>,
        document.getElementById('set_services_portal')
    );
}