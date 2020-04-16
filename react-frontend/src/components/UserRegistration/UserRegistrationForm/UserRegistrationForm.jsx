import React from "react";

import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";

import InputField from "../../FormComponents/InputField/InputField";

import { validationSchema } from "../utils/validationSchema";

import './user-registration-form.scss';

const UserRegistrationForm = () => {
  const handlePhoneInputChange = (event, setFieldValue) => {
    let inputText = event.target.value;
    if (inputText.trim().length === 8) {
      inputText = inputText.substring(0, 7) + " " + inputText.substring(7);
    } else if (inputText.trim().length === 4) {
      inputText = inputText.substring(0, 3) + " " + inputText.substring(3);
    }

    setFieldValue("phone", inputText);
  };
  return (
    <section className="user-registration">
      <Formik
        validateOnChange={true}
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);

          fetch(`${process.env.REACT_APP_CITY_AXESS_API}/auth/local/register`, {
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: data.username,
              first_name: data.firstName,
              last_name: data.lastName,
              email: data.email,
              phone: data.phone,
              password: data.password,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
            });

          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, handleBlur }) => (
          <Form>
            <div className="user-registration__field-username">
              <InputField
                fieldLabel="Username"
                placeholder="Your Username"
                fieldName="username"
              />
            </div>
            <div className="user-registration__field-email">
              <InputField
                fieldLabel="E-Mail"
                placeholder="E-mail"
                fieldName="email"
              />
            </div>
            <div className="user-registration__field-first-name">
              <InputField
                fieldLabel="First Name"
                placeholder="John"
                fieldName="firstName"
              />
            </div>
            <div className="user-registration__field-last-name">
              <InputField
                fieldLabel="Last Name"
                placeholder="Doe"
                fieldName="lastName"
              />
            </div>
            <div className="user-registration__field-phone">
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
            <div className="user-registration__password-container">
              <div className="user-registration__field-password">
                <InputField
                  fieldLabel="Password"
                  placeholder="Password"
                  fieldName="password"
                  type="password"
                />
              </div>
              <div className="user-registration__field-password-confirm">
                <InputField
                  fieldLabel="Confirm Password"
                  placeholder="Confirm Password"
                  fieldName="passwordConfirm"
                  type="password"
                />
              </div>
            </div>

            <div className="user-registration__submit-container">
                <button className="user-registration__submit-button" type="submit">Register!</button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default UserRegistrationForm;
