import './AppointmentBlock.css';

export default function AppointmentBlock({name, contact, service, date, time, business}){
    if(business == null){
        console.log(business)
        return(
            <>
                <div className='info_container'>
                    <h1 className='appt_heading'>{service} with {name}</h1>
                    <h2 className='appt_time'>{date} at {time}</h2>
                    <h2 className='appt_time'>Contact: {contact}</h2>
                </div>
            </>
            
        );
    }
    else{
        console.log(business)
        return(
            <>
                <div className='info_container'>
                    <h1 className='appt_heading'>{service} with {name}</h1>
                    <h2 className='appt_time'>{date} at {time}</h2>
                    <h2 className='appt_time'>Contact: {contact}</h2>
                </div>
            </>
            
        );
    }
}