import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import './AppointmentCalendar.css';
import SubmitAppointment from "../Forms/SubmitAppointment";

export default function AppointmentCalendar({services, divideSlots}){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedulerAvailability, setSchedulerAvailability] = useState([]);
    const [unavailableDays, setUnavailableDays] = useState([]);
    const [appointmentTime, setAppointmentTime] = useState('');
    const [displayForm, setDisplayForm] = useState(false);
    const currentDay = new Date();
    function toggleForm() {
      setDisplayForm(!displayForm);
    }

    function setUnavailability(schedulerArr){
        const unavailability = [];
        schedulerArr.map((day) =>{
            if(day.unavailable == 1){
                unavailability.push(day.day_id);
            }
        })
        setUnavailableDays(unavailability);
    }//store all days scheduler isnt available

    function timeToMins(time){
        const [hours, mins] = time.split(':').map(Number);
        return hours * 60 + mins;
    }//change hh:mm format into minutes format so time slots can operate on data

    function minsToStandardTime(time){
        const hours = Math.floor(time/60);
        let mins = time % 60;
        mins = mins.toString().padStart(2, '0');

        if (hours > 12){
            return((hours-12) + ':' + mins + 'pm');
        } else if (hours == 0){
            return(12 + ':' + mins + 'am');
        } else if (hours == 12){
            return(hours + ':' + mins + 'pm');
        } else {
            return(hours + ':' + mins + 'am');
        }
    }//convert minutes into standard time 

    function minsToMilitaryTime(time){
        let hours = Math.floor(time/60);
        let mins = time % 60;
        hours = hours.toString().padStart(2, '0');
        mins = mins.toString().padStart(2, '0');
        return `${hours}:${mins}:00`;
    }//convert minutes into military time 
    
    function storeAvailability(availability){
        availability.map((mins, index) =>{
            const militaryTime = minsToMilitaryTime(mins);
            const standardTime = minsToStandardTime(mins);
            const endTimeMins = mins + services.time;
            const endTime = minsToMilitaryTime(endTimeMins);
            availability[index] = {db_time: militaryTime, display_time: standardTime, end_time: endTime};
        })
        setSchedulerAvailability(availability);
    }//store all the times that scheduler is available

    
    function getTodaysAvailability(day, presentTime, appts){
        presentTime = timeToMins(presentTime);
        const startTime = timeToMins(day.start_time);
        const endTime = timeToMins(day.end_time);
        let availabilityArr = [];
        if(presentTime > startTime && presentTime < endTime){
            let timeVariable = endTime;
            do{
                const timeFound = appts.find(time => time.start_time === minsToMilitaryTime(timeVariable));
                   if(timeFound == null){
                        availabilityArr.push(timeVariable);
                        timeVariable -= divideSlots;
                   }
                   else{
                        const serviceTime = timeToMins(timeFound.end_time) - timeToMins(timeFound.start_time);
                        let newTime;
                        if(divideSlots > serviceTime || divideSlots === serviceTime){
                            newTime = timeVariable - divideSlots;
                        }
                        else{
                            const subtractTime = serviceTime - divideSlots;
                            newTime = timeVariable - serviceTime + subtractTime;//subtract the service time and subtract
                                                                               //the time it takes to get to the next time slot  
                        }
                        timeVariable = newTime;
                   }//if the time is found
            }while (timeVariable > presentTime);
        }
        storeAvailability(availabilityArr.reverse());
    }//get current day availability

    function getsSelectedDayAvailability(day, appts){
        const startTime = timeToMins(day.start_time);
        const endTime = timeToMins(day.end_time);
        let timeVariable = startTime;
        let availabilityArr = [];
        do{
            const timeFound = appts.find(time => time.start_time === minsToMilitaryTime(timeVariable));
                if(timeFound == null){ 
                    availabilityArr.push(timeVariable);
                    timeVariable += divideSlots;
                }
                else{
                    const serviceTime = timeToMins(timeFound.end_time) - timeToMins(timeFound.start_time);
                    let newTime;
                    if(divideSlots > serviceTime || divideSlots === serviceTime){
                         newTime = timeVariable + divideSlots;
                    }
                    else{
                        const addTime = serviceTime - divideSlots;
                        newTime = timeVariable + serviceTime - addTime;//add the service time and add
                                                                      //the time it takes to get to the next time slot  
                    }
                    timeVariable = newTime;
               }

        }while (timeVariable <= endTime);
        storeAvailability(availabilityArr);
    }//get availability for selected day that isnt current day


    function businessAvailability(schedule, schedulerAppts){
        setUnavailability(schedule);
        const selectedDayId = selectedDate.getDay();
        const dayFound = schedule.find(day => day.day_id === selectedDayId);
        if(dayFound == null) return
        else{
           if(selectedDate.getDate() === currentDay.getDate()){
                const daysTime = currentDay.toTimeString();//create a string of the current day's time
                const currentTime = daysTime.split(' ');//split the time string into an array
                getTodaysAvailability(dayFound, currentTime[0], schedulerAppts);//only send the time from the array
           }//specific function call if day selected is the same as the current day
           else{
                getsSelectedDayAvailability(dayFound, schedulerAppts);
           }
        }
    }//see scheduler's availability for the day that was selected 

    const retrieveBusinessSchedule = async (appts) => {
        const response = await fetch("http://localhost:8000/business-availability",
            {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                credentials: 'include',
                body: JSON.stringify(services)
            }
        )
        const schedule= (await response.json());
        businessAvailability(schedule, appts);
    }//get the every day schedule of business owner

    const retrieveAppointments = async () => {
        const scheduler = services.provider;
        const date = selectedDate.toLocaleDateString();
        const apptReqInfo = {scheduler, date};
        const response = await fetch("http://localhost:8000/day-specific-appointments",
            {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                credentials: 'include',
                body: JSON.stringify(apptReqInfo)
            }
        )
        const appointments = (await response.json());
        retrieveBusinessSchedule(appointments);

    }//find any appointments business owner may have scheduled for specific day


    function storeAppointment(time){
        setAppointmentTime(time);
        toggleForm();
    }

    useEffect(() =>{
        if(services == null) return;
        retrieveAppointments();
    },[selectedDate])

    if(schedulerAvailability.length === 0){
        return(
            <div className="calendar_cont">
                <Calendar 
                    minDate={new Date()}
                    minDetail="month"
                    prev2Label={null}
                    next2Label={null}
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileDisabled={({ date}) => {
                        if(unavailableDays == null){
                            return false;
                        }
                        const unavailableDay = unavailableDays.find(day => day === date.getDay())
                        if(unavailableDay == null){
                            return false;
                        }
                        else{
                            return true;
                    }}}
                />
                <h1 className='no_available_times'>No Available Times to Book </h1>
             </div>
        )
    }
    return(
        <div className="calendar_cont">
            <Calendar 
                minDate={new Date()}
                minDetail="month"
                prev2Label={null}
                next2Label={null}
                onChange={setSelectedDate}
                value={selectedDate}
                tileDisabled={({ date}) => {
                    if(unavailableDays == null){
                        return false;
                    }
                    const unavailableDay = unavailableDays.find(day => day === date.getDay())
                    if(unavailableDay == null){
                        return false;
                    }
                    else{
                        return true;
                }}}
            />
            <h1 className='select_time_header'>Select A Time Slot To Book</h1>
            <div className="availability_list">
                {schedulerAvailability.map((slot, index) =>{
                    return(
                        <button type='button' className='appointment_button' onClick={() => storeAppointment(slot)}>{slot.display_time}</button>
                    )
                })}
            </div>
            <div id='submit_appointment_portal'>
                <SubmitAppointment 
                    displayed={displayForm} 
                    onClose={ toggleForm }
                    appointment={appointmentTime}
                    serviceInfo={services}
                    date={selectedDate}
                 />
            </div>
        </div>
    )


}