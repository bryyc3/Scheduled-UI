import { useState } from "react";
import ReactDom from 'react-dom';
import './Form.css';

export default function BusinessSetup({onClose, displayed}){
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
  
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

    function handleSubmit(){
        const business = {businessName, address, businessDescription};
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
        createBusiness();
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
                        <button type='submit' className='submit_info'>Create Business</button>
                        <hr data-content='or'/>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('business_setup_portal')
    )
}