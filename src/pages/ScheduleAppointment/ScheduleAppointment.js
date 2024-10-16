import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppointmentCalendar from "../../components/AppointmentCalendar/AppointmentCalendar";
import './ScheduleAppointment.css';

export default function ScheduleAppointment(){
    const location = useLocation();
    const serviceObj = location.state.serviceListing;
    const businessObj = location.state.schedulerBusiness;
    const timePerSlot = businessObj.divide_slots;

    const getLoginInfo = async () => {
        const response = await fetch("http://localhost:8000/loginStatus",
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        const loginInfo = (await response.json());
        if(!loginInfo.logged_in){
            window.location = `http://localhost:3000/`
        }
    }//Check for user login status

    useEffect(() =>{
        getLoginInfo();
    },[])


   return(
        <AppointmentCalendar 
            services={serviceObj}
            divideSlots={timePerSlot}
        />
   )
}