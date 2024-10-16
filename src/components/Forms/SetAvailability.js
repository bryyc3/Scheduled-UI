import { useState } from 'react';
import ReactDom from 'react-dom';
import './Form.css';

export default function SetAvailability({onClose, displayed}){
    const [slotDivision, setSlotDivision] = useState('');
    const [availability, SetAvailability] = useState(
        [{id: 1, name: 'Mon', start_time: '9:00', end_time: '17:00', unavailable: false},
         {id: 2, name: 'Tue', start_time: '9:00', end_time: '17:00', unavailable: false},
         {id: 3, name: 'Wed', start_time: '9:00', end_time: '17:00', unavailable: false},
         {id: 4, name: 'Thu', start_time: '9:00', end_time: '17:00', unavailable: false},
         {id: 5, name: 'Fri', start_time: '9:00', end_time: '17:00', unavailable: false},
         {id: 6, name: 'Saturday', start_time: '9:00', end_time: '17:00', unavailable: false},
         {id: 0, name: 'Sunday', start_time: '9:00', end_time: '17:00', unavailable: false}]);

    function changeStartTime(e, index){
        const startVal = e.target.value;
        let availabilityArr = [...availability];
        availabilityArr[index].start_time = startVal;
        SetAvailability(availabilityArr);
    }
    function changeEndTime(e, index){
        const endVal = e.target.value;
        let availabilityArr = [...availability];
        availabilityArr[index].end_time = endVal;
        SetAvailability(availabilityArr);
        
    }
    function toggleAvailability(index){
        let availabilityArr = [...availability];
        availabilityArr[index].start_time = '';
        availabilityArr[index].end_time = '';
        const unavailable = !availabilityArr[index].unavailable;
        availabilityArr[index].unavailable = unavailable;
        SetAvailability(availabilityArr);
        allowTimeEdits(index);
    }//when user toggles unavailability clear time values and change unavailability value 
    function allowTimeEdits(index){
        const dayName = availability[index].name;
        const dayId = availability[index].id;
        const startTime =  document.getElementById(dayName);
        const endTime = document.getElementById(dayId);
        const isAvailable = availability[index].unavailable;
        startTime.readOnly = isAvailable;
        endTime.readOnly = isAvailable;
        startTime.value = '';
        endTime.value = '';
    }//dont allow edits to be made to either time values if user is unavailable

    function storeSlotDivision(e){
        const slotDivInput = e.target.value;
        setSlotDivision(slotDivInput);
    }
    function handleSubmit(){
        const submitAvailability = async () => {
            const availabilitySet= await fetch('http://localhost:8000/insert-availability',
                {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(availability),
                    credentials: 'include'
                })
        }
        const submitSlotDivision = async (e) => {
            const slotDivisionSet= await fetch('http://localhost:8000/insert-slot-division',
                {
                    method: 'PUT',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({slotDivision}),
                    credentials: 'include'
                })
        }
        submitAvailability();
        submitSlotDivision();
    }

    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_form_container'>
            <div className='button_form_container'>
                <button onClick={onClose} className='material-symbols-outlined close_form'>close</button>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <div className='form_content'>
                        <h1 className='availability_message'>When Are You Available?</h1>
                        {availability.map((day, index) => {
                            return(
                                <div className='day_cont'>
                                    <h1 className='day_name'>{day.name}</h1>
                                    <div className='time_cont'>
                                        <div className='time_marker_cont'>
                                            <h2 className='time_marker'>Start:</h2>
                                            <input 
                                                type='time' 
                                                name= 'start_time'
                                                className='form_input time_input'
                                                id={day.name}
                                                onChange={(e) => changeStartTime(e, index)}/>
                                        </div>
                                        <div className='time_marker_cont'>
                                            <h2 className='time_marker'>End:</h2>
                                            <input 
                                                type='time' 
                                                name='end_time'
                                                className='form_input time_input'
                                                id = {day.id}
                                                onChange={(e) => changeEndTime(e, index)}/>
                                        </div>
                                    </div>
                                    <div className='unavailable_cont'>
                                        <h2 className='unavailable_text'>Unavailable</h2>
                                        <input type='checkbox' onChange={(e) => toggleAvailability(index)}/>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="slot_division">
                            <h1>Time Slot Divisions</h1>
                            <h2>Enter how you want to divide your time slots</h2>
                            <input type='number' className='slot_division_input' onBlur={storeSlotDivision}/>
                            <h2>mins</h2>
                        </div>
                         <button type='submit' className='submit_info'>Submit Schedule</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('set_availability_portal')
    );
}