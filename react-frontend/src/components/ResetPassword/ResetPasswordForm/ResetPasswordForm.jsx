import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from "formik";
import InputField from "../../FormComponents/InputField/InputField";
import { validationSchema } from "../utils/validationSchema";
import auth from '../../../utils/auth';
import './reset-password-form.scss';

const ResetPasswordForm = () => {
    const history = useHistory();
    const [serverErrors, setServerErrors] = useState(null);
    const searchParams = new URLSearchParams(window.location.search);

    if(auth.getToken()) history.push("/");

    const mapServerErrors = (messages) => {
        let errorMessages = messages[0].messages.map((error, index) => (
            <div className="login-form__server-error" key={index}>{error.message}</div>
        ))

        setServerErrors(errorMessages);
    }

    const handleResetSubmit = (data, {setSubmitting}) => {
        setSubmitting(true);

        fetch(`${process.env.REACT_APP_CITY_AXESS_API}/auth/reset-password`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                code: searchParams.get('code'),
                password: data.password,
                passwordConfirmation: data.passwordConfirm,
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
                history.push("/");
            };
        })

        setSubmitting(false);
    };

    const resetForm = <Formik
        validateOnChange={true}
        initialValues={{
            password: "",
            passwordConfirm: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleResetSubmit}
    >
        {() => (
            <Form>
                <div className="reset-pass-form__password-field">
                    <InputField
                        fieldLabel="New Password"
                        placeholder="Your New Password"
                        fieldName="password"
                        type="password"
                    />
                </div>
                <div className="reset-pass-form__confirm-password-field">
                    <InputField
                        fieldLabel="Confirm New Password"
                        placeholder="Your New Password"
                        fieldName="passwordConfirm"
                        type="password"
                    />
                </div>

                {serverErrors ? serverErrors : ''}

                <div className="reset-pass-form__submit-container">
                    <button className="reset-form__submit-button" type="submit">Set New Password</button>
                </div>
            </Form>
        )}
    </Formik>

    return (
        <section className="reset-pass-form">
            <h2 className="reset-pass-form__heading">Set a New Password</h2>
            {resetForm}
        </section>
    )
}

export default ResetPasswordForm
