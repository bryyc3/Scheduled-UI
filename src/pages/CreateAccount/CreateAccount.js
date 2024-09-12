import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Background from '../../components/Background/Background.js';
import AccountType from '../../components/AccountType/AccountType.js';
import './CreateAccount.css';

function CreateAccount(){
    useEffect(() => {
        fetch("http://localhost:8000/loginStatus",
          {
            method: 'GET',
            credentials: 'include'
          }
        ).then((res) => res.json())
          .then(data => {
            console.log(data);
            (data.logged_in) ? window.location = `http://localhost:3000/${data.account_type}/dashboard` : console.log(data.logged_in)
          })},[])
    return(
        <>
            <Background />
            <Link to='/' className='material-symbols-outlined arrow_back'>arrow_back</Link>
            <h1 className='create_account_header'>CREATE ACCOUNT</h1>
            <div className='accounts_container'>
               <AccountType
                    account={'scheduler'}
                    header={'Scheduler'}
                    accountDescription={'I provide a service/own a business and need a way  to manage appointments and allow customers to book appointments'} />
                <AccountType 
                    account={'booker'}
                    header={'Booker'}
                    accountDescription={'I am looking to book appointments and find businesses/people that are offering a service'} /> 
            </div>
            <div id='create_account_portal'></div>
        </>
    );
}

export default CreateAccount;