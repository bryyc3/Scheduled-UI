import ReactDom from 'react-dom';
import './ViewBusiness.css'

export default function ViewBusiness({displayed, onClose, businessData}){
    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_business_cont'>
            <div className="business_button_cont">
                <button onClick={onClose} className='material-symbols-outlined exit_business'>arrow_back</button>
                <div className="business_cont">
                    <div className="business_info">
                        <h1 className='business_name'>{businessData.business_name}</h1>
                        <p className='business_location'>{businessData.location}</p>
                        <p className='business_desc'>{businessData.description}</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>,
        document.getElementById('business_view_portal')
    )
}