import { useState } from 'react';
import './AccountType.css';
import AccountForm from "../AccountForm/AccountForm";

function AccountType ({ account, accountDescription }){
    const [displayForm, setDisplayForm] = useState(false);
    function toggleForm() {
        setDisplayForm(!displayForm);
    }
    return (
        <>
            <div className='account_container'>
                <h1 className='account_name'>{ account }</h1>
                <p className='account_description'>{ accountDescription }</p>
                <button onClick={ toggleForm } className='proceed'>Proceed</button>
            </div>
            <AccountForm 
                displayed={displayForm} 
                onClose={ toggleForm }
                accountType = { account }
            />
        </>
    );
}

export default AccountType;