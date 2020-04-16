import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from "formik";
import { TextField } from "@material-ui/core";
import InputField from "../../FormComponents/InputField/InputField";
import { validationSchema } from "../utils/validationSchema";
import auth from '../../../utils/auth';
import './update-form.scss';

const UpdateForm = (props) => {
    const history = useHistory();
    const {user} = props;
    const [serverErrors, setServerErrors] = useState(null);

    if(!auth.getToken()) history.push("/login");

    const handlePhoneInputChange = (e, setFieldValue) => {
        let inputText = e.target.value;
        if (inputText.trim().length === 8) {
            inputText = inputText.substring(0, 7) + " " + inputText.substring(7);
        } else if (inputText.trim().length === 4) {
            inputText = inputText.substring(0, 3) + " " + inputText.substring(3);
        }
    
        setFieldValue("phone", inputText);
      };

    const mapServerErrors = (message) => {
        let errorMessage = <div className="update-form__server-error">{message}</div>;

        setServerErrors(errorMessage);
    }

    const handleUpdateProfile = (data, {setSubmitting}) => {
        setSubmitting(true);

        let jsonBody = data.password
            ? 
                JSON.stringify({
                    username: data.username,
                    email: data.email,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    phone: data.phone,
                    password: data.password,
                })
            :
                JSON.stringify({
                    username: data.username,
                    email: data.email,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    phone: data.phone,
                });

        fetch(`${process.env.REACT_APP_CITY_AXESS_API}/users/${user.id}`, {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${auth.getToken()}`,
            },
            body: jsonBody,
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            if(data.error) {
                mapServerErrors(data.message)
            }
            else {
                auth.setUserInfo(data);
                setServerErrors(<div className="update-form__success-message">Profile Updated!</div>);
                history.push('/profile');
            };
        })

        setSubmitting(false);
    }

    const updateForm = <Formik
        key="update-form"
        validateOnChange={true}
        validateOnBlur={true}
        initialValues={{
            username: user.username,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            phone: user.phone,
            password: '',
            passwordConfirm: '',
          }}
        validationSchema={validationSchema}
        onSubmit={handleUpdateProfile}
    >
        {({ values, setFieldValue, handleBlur }) => (
            <Form>
                <div className="update-form__field-username">
                    <InputField
                        fieldLabel="Username"
                        placeholder="Your Username"
                        fieldName="username"
                    />
                </div>
                <div className="update-form__field-email">
                    <InputField
                        fieldLabel="E-Mail"
                        placeholder="E-mail"
                        fieldName="email"
                    />
                </div>
                <div className="update-form__field-first-name">
                    <InputField
                        fieldLabel="First Name"
                        placeholder="John"
                        fieldName="firstName"
                    />
                </div>
                <div className="update-form__field-last-name">
                    <InputField
                        fieldLabel="Last Name"
                        placeholder="Doe"
                        fieldName="lastName"
                    />
                </div>
                <div className="update-form__field-phone">
                    <TextField
                        onChange={(e) => handlePhoneInputChange(e, setFieldValue)}
                        placeholder="111 111 1111"
                        label="Phone Number*"
                        onBlur={handleBlur}
                        name="phone"
                        value={values.phone}
                    />
                    <div><span><ErrorMessage name="phone" /></span></div>
                </div>
                <fieldset className="update-form__change-password-fieldset">
                    <legend>Change Your Password</legend>
                    <div className="update-form__field-password">
                        <InputField
                            fieldLabel="Password"
                            placeholder="Password"
                            fieldName="password"
                            type="password"
                        />
                    </div>
                    <div className="update-form__field-password-confirm">
                        <InputField
                            fieldLabel="Confirm Password"
                            placeholder="Confirm Password"
                            fieldName="passwordConfirm"
                            type="password"
                        />
                    </div>
                </fieldset>

                {serverErrors ? serverErrors : ''}

                <div className="update-form__submit-container">
                    <button className="update-form__submit-button" type="submit">Update Your Profile</button>
                </div>
            </Form>
        )}
    </Formik>

    return (
        <section className="update-form">
            <h2 className="update-form__heading">Your Profile</h2>
            {updateForm}
        </section>
    )
}

export default UpdateForm
