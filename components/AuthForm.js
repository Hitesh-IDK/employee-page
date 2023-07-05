import { useState } from 'react';
import authCss from './AuthForm.module.css';

export default function AuthForm() {

    const [accountExists, setAccountExists] = useState(true);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRePassword, setInputRePassword] = useState('');

    const emailHandler = (event) => {
        setInputEmail(event.target.value.trim());
    }

    const passwordHandler = (event) => {
        setInputPassword(event.target.value.trim());
    }

    const rePasswordHandler = (event) => {
        setInputRePassword(event.target.value.trim());
    }

    const accountStatusHandler = () => {
        setAccountExists((prevValue) => {
            if (prevValue)
                return false;
            else
                return true;
        })
    }

    const loginHandler = () => {

    }

    return (
        <div className={authCss.main__container} >
            <div className={authCss.sub__container}>
                <h1>{accountExists ? 'Login' : 'SignUp'}</h1>
                <form onSubmit={loginHandler} className={authCss.form__container}>
                    <label>Email</label>
                    <input type='email' value={inputEmail} onChange={emailHandler} className={authCss.input_field} />
                    <label>{accountExists ? 'Password' : 'New Password'}</label>
                    <input type='password' value={inputPassword} onChange={passwordHandler} className={authCss.input_field} />
                    {!accountExists && <label>Retype Password</label>}
                    {!accountExists && <input type='password' value={inputRePassword} onChange={rePasswordHandler} className={authCss.input_field} />}
                </form>
                <div className={authCss.prompt} onClick={accountStatusHandler} >{accountExists ? 'New User? Signup' : 'Existing User? Login'}</div>
            </div>
        </div>
    );
}