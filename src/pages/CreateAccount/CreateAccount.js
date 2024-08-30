import { Link } from 'react-router-dom';
import IntroBackground from '../../components/Background/IntroBackground';
import AccountType from '../../components/AccountType/AccountType.js';
import './CreateAccount.css';

function CreateAccount(){
    return(
        <>
            <IntroBackground />
            <Link to='/' className='material-symbols-outlined arrow_back'>arrow_back</Link>
            <h1 className='create_account_header'>CREATE ACCOUNT</h1>
            <div className='accounts_container'>
               <AccountType
                    account={'Scheduler'}
                    accountDescription={'I provide a service/own a business and need a way  to manage appointments and allow customers to book appointments'} />
                <AccountType 
                    account={'Booker'}
                    accountDescription={'I am looking to book appointments and find businesses/people that are offering a service'} /> 
            </div>
            <div id='create_account_portal'></div>
        </>
    );
}

export default CreateAccount;