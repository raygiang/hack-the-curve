import React from 'react';
import './reset-password.scss';
import ResetPasswordForm from '../../ResetPassword/ResetPasswordForm/ResetPasswordForm';

function ResetPassword() {
    return (
        <main className="reset-page">
            <h1 className="reset-page__heading">Forgot your Password?</h1>
            <p className="reset-page__description">Please fill out the form to reset your password below.</p>
            <ResetPasswordForm />
        </main>
    )
}

export default ResetPassword
