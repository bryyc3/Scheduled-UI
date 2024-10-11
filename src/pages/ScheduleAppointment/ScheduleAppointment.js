import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import './ScheduleAppointment.css';

export default function ScheduleAppointment(){
    const location = useLocation();
    const serviceObj = location.state;

    if(serviceObj == null){
        return(
            <h1>Sorry! Theres No Info To Schedule An Appointment. Return To Dashboard</h1>
        )
    }
    return(
        <div className="calendar_cont">
            <Calendar 
                minDate={new Date()}
                minDetail="month"
                prev2Label={null}
                next2Label={null}
            />
        </div>
    )
}