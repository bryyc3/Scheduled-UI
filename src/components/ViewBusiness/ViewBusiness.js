import ReactDom from 'react-dom';
import BusinessDashboard from '../BusinessDashboard/BusinessDashboard';
import './ViewBusiness.css'

export default function ViewBusiness({displayed, onClose, businessData}){
    
    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_business_cont'>
            <div className="business_button_cont">
                <button onClick={onClose} className='material-symbols-outlined exit_business'>arrow_back</button>
                <BusinessDashboard account='booker' business={businessData}/>
            </div>
        </div>,
        document.getElementById('business_view_portal')
    )
}