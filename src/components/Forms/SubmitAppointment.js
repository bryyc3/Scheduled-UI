import { useState } from 'react';
import ReactDom from 'react-dom';
import './Form.css';

export default function SubmitAppointment({appointment, serviceInfo, date, onClose, displayed}){
    const [schedulingError, setSchedulingError] = useState('');
    
    const formattedDate = createDateString();
    function createDateString(){
          return date.toLocaleDateString();
    }

    function handleSubmit(e){
        e.preventDefault();
        const apptInfo = {start_time: appointment.db_time, end_time: appointment.end_time,
                          service_provider: serviceInfo.provider,
                          date: formattedDate, service_name: serviceInfo.service, time_display: appointment.display_time};
        const submitAppointment = async() =>{
            const sentUserInfo = await fetch('http://localhost:8000/schedule-appointment',
                {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(apptInfo),
                    credentials: 'include'
                })
            const response = (await sentUserInfo.json());
            if(response.success){
                window.location = `http://localhost:3000/appointment-scheduled`;
            }
            else{
                setSchedulingError('There was an issue scheduling your appointment, please retry or return back to dashboard');
            }
        }
        submitAppointment();
    }

    createDateString();
    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_form_container'>
            <div className='button_form_container'>
                <button onClick={onClose} className='material-symbols-outlined close_form'>close</button>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <div className='form_content'>
                        <h1 className='create_header'>Confirm Your Appointment</h1>
                        <hr />
                        <h1 className='appointment_info_header'>Appointment Info</h1>
                        <div className="appointment_info_cont">
                            <div className="appointment_item_container">
                                <h2 className='appointment_desc_name'>Service Name: </h2>
                                <p className='appointment_info_description'>{serviceInfo.service}</p>
                            </div>
                            <div className="appointment_item_container">
                                <h2 className='appointment_desc_name'>Price: </h2>
                                <p className='appointment_info_description'>${serviceInfo.price}</p>
                            </div>
                            <div className="appointment_item_container">
                                <h2 className='appointment_desc_name'>Date: </h2>
                                <p className='appointment_info_description'>{formattedDate}</p>
                            </div>
                            <div className="appointment_item_container">
                                <h2 className='appointment_desc_name'>Time: </h2>
                                <p className='appointment_info_description'>{appointment.display_time}</p>
                            </div>
                            <div className="appointment_item_container">
                                <h2 className='appointment_desc_name'>Duration: </h2>
                                <p className='appointment_info_description'>{serviceInfo.time} mins</p>
                            </div>
                        </div>
                        
                        <hr data-content='or'/>

                        <button type='submit' className='submit_info'>Confirm Appointment</button>
                        {schedulingError &&
                        <div className='error_container'>
                            <span className='material-symbols-outlined error_icon'>error</span>
                            <span className='error_message'>{ schedulingError }</span>
                        </div>}

                    </div>
                </form>
            </div>
            
        </div>,
        document.getElementById('submit_appointment_portal')
    );
}