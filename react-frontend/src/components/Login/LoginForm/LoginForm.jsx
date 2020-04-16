import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from "formik";
import InputField from "../../FormComponents/InputField/InputField";
import { validationSchemaLogin, validationSchemaReset } from "../utils/validationSchema";
import auth from '../../../utils/auth';
import './login-form.scss';

const LoginForm = () => {
    const history = useHistory();
    const [serverErrors, setServerErrors] = useState(null);
    const [displayReset, setDisplayReset] = useState(false);
    
    if(auth.getToken()) history.push("/");
    
    const mapServerErrors = (messages) => {
        let errorMessages = messages[0].messages.map((error, index) => (
            <div className="login-form__server-error" key={index}>{error.message}</div>
        ))

        setServerErrors(errorMessages);
    }

    const handleLoginSubmit = (data, {setSubmitting}) => {
        setSubmitting(true);
        
        fetch(`${process.env.REACT_APP_CITY_AXESS_API}/auth/local`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                identifier: data.identifier,
                password: data.password,
            }),
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(!data.user) {
                mapServerErrors(data.message)
            }
            else {
                auth.setToken(data.jwt);
                auth.setUserInfo(data.user);
                setServerErrors(<div className="login-form__success-message">Login Successful!</div>);
            };
        })

        setSubmitting(false);
    }

    const handleResetSubmit = (data, {setSubmitting}) => {
        setSubmitting(true);

        fetch(`${process.env.REACT_APP_CITY_AXESS_API}/auth/forgot-password`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
            }),
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            if(!data.ok) {
                mapServerErrors(data.message)
            }
            else {
                setServerErrors(<div className="login-form__success-message">Email has been sent!</div>);
            };
        })

        setSubmitting(false);
    };

    const toggleForm = () => {
        setServerErrors(null);
        setDisplayReset(!displayReset);
    }

    const loginForm = <Formik
        key="login-form"
        validateOnChange={true}
        initialValues={{
            identifier: "",
            password: "",
        }}
        validationSchema={validationSchemaLogin}
        onSubmit={handleLoginSubmit}
    >
        {() => (
            <Form>
                <div className="login-form__identifier-field">
                    <InputField
                        fieldLabel="Username or Email"
                        placeholder="Your Username or Email Address"
                        fieldName="identifier"
                    />
                </div>
                <div className="login-form__password-field">
                    <InputField
                        fieldLabel="Password"
                        placeholder="Your Password"
                        fieldName="password"
                        type="password"
                    />
                </div>

                {serverErrors ? serverErrors : ''}

                <div className="login-form__submit-container">
                    <button className="login-form__submit-button" type="submit">Login</button>
                    <button className="login-form__forgot-password" type="button" onClick={toggleForm}>Forgot Password</button>
                </div>
            </Form>
        )}
    </Formik>

    const resetPasswordForm = <Formik
        key="reset-form"
        validateOnChange={true}
        initialValues={{
            email: "",
        }}
        validationSchema={validationSchemaReset}
        onSubmit={handleResetSubmit}
    >
        {() => (
            <Form>
                <div className="reset-form__email-field">
                    <InputField
                        fieldLabel="Email"
                        placeholder="example@domain.com"
                        fieldName="email"
                    />
                </div>

                {serverErrors ? serverErrors : ''}

                <div className="reset-form__submit-container">
                    <button className="reset-form__login-button" type="button" onClick={toggleForm}>Back to Login</button>
                    <button className="reset-form__submit-button" type="submit">Send Reset Email</button>
                </div>
            </Form>
        )}
    </Formik>;

    return (
        <section className={displayReset ? 'reset-form' : 'login-form'}>
            <h2 className={(displayReset ? 'reset-form' : 'login-form') + "__heading"}>{displayReset ? 'Reset Password' : 'Login'}</h2>
            {displayReset ? resetPasswordForm : loginForm}
        </section>
    )
}

export default LoginForm
