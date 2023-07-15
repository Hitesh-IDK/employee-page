import { useEffect, useState } from 'react';
import authCss from './AuthForm.module.css';

export default function AuthForm(props) {

    const {accountExists, setAccountExists} = props;
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRePassword, setInputRePassword] = useState('');

    const [emailCss, setEmailCss] = useState(`${authCss.input_field}`);
    const [passwordCss, setPasswordCss] = useState(`${authCss.input_field}`);
    const [rePasswordCss, setRePasswordCss] = useState(`${authCss.input_field}`);

    const emailHandler = (event) => {
        setInputEmail(event.target.value.trim());
        setEmailCss(`${authCss.input_field}`);
    }

    const passwordHandler = (event) => {
        setInputPassword(event.target.value.trim());
        setPasswordCss(`${authCss.input_field}`);
    }

    const rePasswordHandler = (event) => {
        setInputRePassword(event.target.value.trim());
        setRePasswordCss(`${authCss.input_field}`);
    }

    const accountStatusHandler = () => {
        setAccountExists((prevValue) => {
            if (prevValue)
                return false;
            else
                return true;
        })
    }

    const dataValidater = ({ email, password, rePassword }) => {
        let isValid = true;

        if (!email.trim().includes('@')) {
            setEmailCss(`${authCss.input_field} ${authCss.invalid_field}`);
            isValid = false;
        }

        if (!(password.length > 7)) {
            setPasswordCss(`${authCss.input_field} ${authCss.invalid_field}`);
            isValid = false;
        }

        if (!accountExists ? !((rePassword.trim().length > 7) && rePassword === password)  : false) {
            setRePasswordCss(`${authCss.input_field} ${authCss.invalid_field}`);
            isValid = false;
        }
        return isValid;
    }

    useEffect(() => { }, [emailCss, passwordCss, rePasswordCss]);

    const submitHandler = (event) => {
        event.preventDefault();
        const data = {
            email: inputEmail,
            password: inputPassword,
            rePassword: inputRePassword
        }

        if (!dataValidater(data)) {
            return;
        }

        if (accountExists) {
            props.onLogin(data);
        }
        else {
            props.onSignup(data);
        }
    }

    return (
        <div className={authCss.main__container} >
            <div className={authCss.sub__container}>
                <h1>{accountExists ? 'Login' : 'SignUp'}</h1>
                <form onSubmit={submitHandler} className={authCss.form__container}>
                    <label>Email</label>
                    <input type='email' value={inputEmail} onChange={emailHandler} className={emailCss} />
                    <label>{accountExists ? 'Password' : 'New Password'}</label>
                    <input type='password' value={inputPassword} onChange={passwordHandler} className={passwordCss} />
                    {!accountExists && <label>Retype Password</label>}
                    {!accountExists && <input type='password' value={inputRePassword} onChange={rePasswordHandler} className={rePasswordCss} />}
                    <button type='submit' className={authCss.submit}>Submit</button>
                </form>
                <div className={authCss.prompt} onClick={accountStatusHandler} >{accountExists ? 'New User? Signup' : 'Existing User? Login'}</div>
            </div>
        </div>
    );
}