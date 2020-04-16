import React from 'react';
import {useHistory} from 'react-router-dom';
import auth from '../../../utils/auth';
import UserRegistrationForm from '../../UserRegistration/UserRegistrationForm/UserRegistrationForm';
import './register-page.scss';

function RegisterPage() {
    const history = useHistory();

    if(auth.getToken()) history.push("/");

    return (
        <main className="register-page">
            <h1 className="register-page__heading">Welcome, to CityAxess!</h1>
            <p className="register-page__description">Register your account to personalize your experience.</p>
            <UserRegistrationForm />
        </main>
    )
}

export default RegisterPage
