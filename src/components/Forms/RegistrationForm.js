import  {useState} from 'react';
import ReactDom from 'react-dom';
import './Form.css';

export default function RegistrationForm ({ displayed, accountType, onClose}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [firstName, setFirstName] = useState('');

    const passwordLength = 8;
    
    const checkEmail = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        setEmailError(null);
    };
    
    const checkPassword = (e) => {
        const passwordInput = e.target.value;
        if (passwordInput.length < passwordLength){
            setPasswordError('Password must be at least 8 characters')
        }
        else{
            setPassword(passwordInput);
            setPasswordError(null);
        }
    };//after user enters password, store in variable if it meets requirements

    const comparePasswords = (e) => {
        const confirmPasswordInput = e.target.value;
        if(confirmPasswordInput !== password){
            setConfirmPasswordError('Passwords do not match')
        }
        else{
            setConfirmPasswordError(null);
        };
    };//check if the confirmed password matches the password previously entered 

    function storeName(e){
        const nameInput = e.target.value;
        setFirstName(nameInput);
    }

    function handleSubmit(e){
        e.preventDefault();
        const user = {email, password, accountType, firstName};
        const createUser = async () => {
            const sentUserInfo = await fetch('http://localhost:8000/create-user',
                {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(user),
                    credentials: 'include'
                })
            const response = (await sentUserInfo.json());
            
                if(response.created){
                    window.location = `http://localhost:3000/dashboard` 
                }
                else{
                    setEmailError('Email is already associated with another user');
                }
        }
        createUser();
    }//send user data to server if form fields meet specified requirements
     //if user email isnt already in the database, redirect to appropriate page

    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_form_container'>
            <div className='button_form_container' >
                <button onClick={onClose} className='material-symbols-outlined close_form'>close</button>
                <form className='modal_form' onSubmit={handleSubmit}>
                    <div className='form_content'>
                        <h1 className='create_header'>Create { accountType } Account</h1>
                        <hr />
                        <label htmlFor='email'>Email</label><br />
                        <input 
                            type='email'
                            placeholder='Enter Your Email'
                            name='email'
                            className='form_input'
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
                            onBlur={ checkEmail }
                            required/>
                        {emailError &&
                        <div className='error_container'>
                            <span className='material-symbols-outlined error_icon'>error</span>
                            <span className='error_message'>{ emailError }</span>
                        </div>}
                        <br />

                        <label htmlFor='email'>First Name</label><br />
                        <input 
                            type='text'
                            placeholder='Enter Your First Name'
                            name='name'
                            className='form_input'
                            onBlur={ storeName }
                            required/>
                        <br />

                        <label htmlFor='password'>Password</label><br />
                        <input 
                            type='password'
                            placeholder='Enter Your Password'
                            name='password'
                            className='form_input'
                            pattern='.{8,}'
                            onBlur={ checkPassword }
                            required/>
                        {passwordError &&
                        <div className='error_container'>
                            <span className='material-symbols-outlined error_icon'>error</span>
                            <span className='error_message'>{ passwordError }</span>
                        </div>}
                        <br />

                        <label htmlFor='password-confirm'>Confirm Password</label><br />
                        <input 
                            type='password'
                            placeholder='Enter Your Password'
                            name='confirmPassword'
                            className='form_input'
                            pattern='.{8,}'
                            onBlur={ comparePasswords }
                            required/>
                        {confirmPasswordError &&
                        <div className='error_container'>
                            <span className='material-symbols-outlined error_icon'>error</span>
                            <span className='error_message'>{ confirmPasswordError }</span>
                        </div>}
                        <br />
                        <button type='submit' className='submit_info'>Create Account</button>

                        <hr data-content='or'/>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('create_account_portal')
    );
}
