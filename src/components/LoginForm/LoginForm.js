import  {useState} from 'react';
import ReactDom from 'react-dom';
import './LoginForm.css';

function LoginForm ({ displayed, onClose}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    console.log(loginError)
    
    const emailEntered = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        setLoginError(null);
    };
    
    const passwordEntered = (e) => {
        const passwordInput = e.target.value;
        setPassword(passwordInput);
        setLoginError(null);
    };

    function handleSubmit(e){
        e.preventDefault();
        const user = {email, password};
        fetch('http://localhost:8000/login',
            {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(user),
                credentials: 'include'
            }
            ).then(res => res.json())
            .then(data => {
            (data.login) ? window.location = 'http://localhost:3000/booker/dashboard' : setLoginError('Email or Password is incorrect');
            })
        
    }//send user data to server if form fields meet specified requirements
     //if email and password are correct sign user in

    if (!displayed) return null;
    return ReactDom.createPortal(
        <div className='modal_form_container'>
            <div className='button_form_container' onSubmit={handleSubmit}>
                <button onClick={onClose} className='material-symbols-outlined close_form'>close</button>
                <form className='modal_form'>
                    <div className='form_content'>
                        <h1 className='create_header'>Login</h1>
                        <hr />
                        <label htmlFor='email'>Email</label><br />
                        <input 
                            type='email'
                            placeholder='Enter Your Email'
                            name='email'
                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
                            onBlur={ emailEntered }
                            required/>
                        <br />

                        <label htmlFor='password'>Password</label><br />
                        <input 
                            type='password'
                            placeholder='Enter Your Password'
                            name='password'
                            onBlur={ passwordEntered }
                            required/>
                        {loginError &&
                        <div className='error_container'>
                            <span className='material-symbols-outlined error_icon'>error</span>
                            <span className='error_message'>{ loginError }</span>
                        </div>}
                        <br />

                        <button type='submit' className='submit_account_info'>Login</button>

                        <hr data-content='or'/>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('create_account_portal')
    );
}

export default LoginForm;
