
import { useState, useEffect } from "react";
import SetAvailability from "../Forms/SetAvailability";
import './BusinessAvailability.css'

export default function BusinessAvailability({type}){
    const [timesAvailable, setTimesAvailable] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    function toggleForm() {
        setDisplayForm(!displayForm);
    }

    const getAvailability = async () => {
        const response = await fetch("http://localhost:8000/business-availability",
            {
                method: 'GET',
                credentials: 'include'
            }
        )
        const availability= (await response.json());
        availability.map((day,index)=>{
            let startTimeParts = day.start_time.split(':'),
                startHour = Number(startTimeParts[0]),
                startMins = startTimeParts[1];
            let endTimeParts = day.end_time.split(':'),
                endHour = Number(endTimeParts[0]),
                endMins = endTimeParts[1];
            if (startHour > 12){
                day.start_time = (startHour-12) + ':' + startMins + 'pm';
            } else if (startHour == 0){
                day.start_time = 12 + ':' + startMins + 'am';
            } else if (startHour == 12){
                day.start_time = startHour + ':' + startMins + 'pm';
            } else {
                day.start_time = startHour + ':' + startMins + 'am';
            }
            if (endHour > 12){
                day.end_time = (endHour-12) + ':' + endMins + 'pm';
            } else if (endHour == 0){
                day.end_time = 12 + ':' + endMins + 'am';
            } else if (endHour == 12){
                day.end_time = endHour + ':' + endMins + 'pm';
            } else {
                day.end_time = endHour + ':' + endMins + 'am';
            }//convert military time to standard

            setTimesAvailable(availability);
        })
   }

    
    useEffect(() => {
       getAvailability();
    },[])
    
    if(type === 'booker') return null;//dont list availability for a booker displaying scheduler's business

    if(timesAvailable.length === 0){
        return(
            <>
                <div className="availability_cont">
                    <button className='open_form_button' onClick={ toggleForm }>Set Your Availability</button>
                    <div id='set_availability_portal'>
                        <SetAvailability
                            displayed={displayForm}
                            onClose={toggleForm}
                        />
                    </div>
                </div>  
                <hr />
            </>
            
        )
    }

    return(
        <>
            <h2 className='business_header'>Availability</h2>
            {timesAvailable.map((day, index) =>{
                    if(day.unavailable == true){
                        return(
                            <div className='day_availability'>
                                <h1 className='day'>{day.day}</h1>
                                <div className="availability_display">
                                    <div className='availability_time'>Unavailable</div>
                                </div>
                            </div>
                        )
                    }
                    return(
                        <>
                            <div className='day_availability'>
                                <h1 className='day'>{day.day}</h1>
                                <div className='availability_display'>
                                    <div className='availability_time'>{day.start_time} - {day.end_time}</div>
                                </div>
                            </div>
                            <hr />
                        </>
                    
                    )
                })
            }
        </>
        
    )
    
}