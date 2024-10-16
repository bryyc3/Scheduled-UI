import { Link } from "react-router-dom";
import './AppointmentScheduled.css';

export default function AppointmentScheduled(){
    return(
        <div className='success_message_background'>
            <div className="success_message_content">
                <h1 className='appt_scheduled_msg'>Your Appointment Has Been Scheduled!</h1>
                <Link to="/dashboard" className='return_to_dash_link'><button  className='return_to_dash'>Return To Dashboard</button></Link>
            </div>
        </div>
    )
}