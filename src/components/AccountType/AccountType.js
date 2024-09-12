import { useState } from 'react';
import './AccountType.css';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

function AccountType ({ account, header, accountDescription}){
    const [displayForm, setDisplayForm] = useState(false);
    function toggleForm() {
        setDisplayForm(!displayForm);
    }
    return (
        <>
            <div className='account_container'>
                <h1 className='account_name'>{ header }</h1>
                <p className='account_description'>{ accountDescription }</p>
                <button onClick={ toggleForm } className='proceed'>Proceed</button>
            </div>
            <RegistrationForm 
                displayed={displayForm} 
                onClose={ toggleForm }
                accountType = { account }
            />
        </>
    );
}

export default AccountType;