import Navbar from '../../components/Navbar/Navbar.js';
import ApptSquare from '../../components/ApptSquare/ApptSquare.js';
import './BookerDashboard.css';

export default function BookerDashboard(){
    return(
        <>
            <Navbar />
            <div className='content_background'>
                <ApptSquare />
                <h1 className='no_appts_message'>No other appointments scheduled</h1>
            </div>
            <div className='content_background'>
                
            </div>
        </>
        
    );
}