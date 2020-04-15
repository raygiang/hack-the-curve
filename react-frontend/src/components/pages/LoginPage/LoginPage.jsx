import React from 'react';
import LoginForm from '../../Login/LoginForm/LoginForm';
import './login-page.scss';

function LoginPage() {
    return (
        <main className="login-page">
            <h1 className="login-page__heading">Welcome to City Axess!</h1>
            <p className="login-page__description">Please login to customize your settings and to subscribe to email alerts.</p>
            <LoginForm />
        </main>
    )
}

export default LoginPage
