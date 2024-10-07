import { useState, useEffect } from "react";
import AppointmentBlock from "../AppointmentBlock/AppointmentBlock";
import './Appointments.css';

export default function Appointments({dashboard}){
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        const response = await fetch("http://localhost:8000/appointments",
           {
           method: 'GET',
           credentials: 'include'
           }
       )
       const userAppointments = (await response.json());
       setAppointments(userAppointments);
      }
      
    useEffect(() => {
        getAppointments();
     },[])
    if(appointments.length < 1){
        return(
             <h1 className='appointment_message'>No Scheduled Appointments</h1>
        )
    }//if there are no appointments display no appointments message 
    else{
        if(dashboard === 'scheduler'){
            return(
                appointments.map((appointment) =>{
                    return(
                        <AppointmentBlock 
                            key = {appointment.time}
                            name = {appointment.client_name}
                            contact = {appointment.client_email}
                            service = {appointment.service}
                            date = {appointment.date}
                            time = {appointment.time}
                            business = {null}
                        />
                    )
                })
            )
        }
        if(dashboard === 'booker'){
            return(
                appointments.map((appointment) =>{
                    return(
                        <AppointmentBlock 
                            key = {appointment.time}
                            name = {appointment.service_provider_name}
                            contact = {appointment.service_provider_email}
                            service = {appointment.service}
                            date = {appointment.date}
                            time = {appointment.time}
                            business = {appointment.business}
                        />
                    )
                })
            )
        }
    }//if there are appointments map through the array
     //and display each of the appointments depending on which dashboard it is 
}