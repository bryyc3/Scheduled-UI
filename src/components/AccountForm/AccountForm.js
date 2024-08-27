import  {useState} from 'react';
import ReactDom from 'react-dom';
import './AccountForm.css';

function AccountForm ({ displayed, accountType, onClose}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkEmail = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
    };
    const checkPassword = (e) => {
        const passwordInput = e.target.value;
        setPassword(passwordInput);
    };
    const confirmPassword = (e) => {
        const confirmPasswordInput = e.target.value;
        if(confirmPasswordInput !== password){
            alert("Passwords must match");
        }
    };

    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_form_container'>
            <div className='button_form_container'>
                <button onClick={ onClose } className='material-symbols-outlined close_form'>close</button>
                <form className='modal_form'>
                    <div className='form_content'>
                        <h1 className='create_header'>Create { accountType } Account</h1>
                        <hr />
                        <label htmlFor='email'>Email</label><br />
                        <input 
                            type='email'
                            placeholder='Enter Your Email'
                            name='email'
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
                            onBlur={ checkEmail }
                            required/><br /><br />

                        <label htmlFor='password'>Password</label><br />
                        <input 
                            type='password'
                            placeholder='Enter Your Password'
                            name='password'
                            pattern='.{8,}'
                            onBlur={ checkPassword }
                            required/><br /><br />

                        <label htmlFor='password-confirm'>Confirm Password</label><br />
                        <input 
                            type='password'
                            placeholder='Enter Your Password'
                            name='confirmPassword'
                            pattern='.{8,}'
                            onBlur={ confirmPassword }
                            required/><br /><br />

                        <button type='submit' className='submit_account_info'>Create Account</button>

                        <hr data-content='or'/>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('form_portal')
    );
}

export default AccountForm;
