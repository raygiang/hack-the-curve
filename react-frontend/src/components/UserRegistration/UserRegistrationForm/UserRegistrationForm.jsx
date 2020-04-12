import React from "react";

import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";

import InputField from "../InputField/InputField";

import { validationSchema } from "../utils/validationSchema";

const UserRegistrationForm = () => {
  const handlePhoneInputChange = (event, setFieldValue) => {
    let inputText = event.target.value;
    if(inputText.length > 7) {
      inputText = inputText.substring(0, 3) + " " + inputText.substring(4, 7) + " " + inputText.substring(8);
    } else if(inputText.length > 3) {
      inputText = inputText.substring(0, 3) + " " + inputText.substring(4);
    }

    setFieldValue("phone", inputText);
  };
  return (
    <section className="user-registration">
      <Formik
        validateOnChange={true}
        initialValues={{ firstName: "", lastName: "", email: "", phone: "" }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, handleBlur}) => (
          <Form>
            <div>
              <InputField
                fieldLabel="First Name"
                placeholder="John"
                fieldName="firstName"
              />
            </div>
            <div>
              <InputField
                fieldLabel="Last Name"
                placeholder="Doe"
                fieldName="lastName"
              />
            </div>
            <div>
              <InputField
                fieldLabel="E-Mail"
                placeholder="E-mail"
                fieldName="email"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => handlePhoneInputChange(e, setFieldValue)}
                placeholder="111 111 1111"
                label="Phone Number*"
                onBlur={handleBlur}
                name="phone"
                value={values.phone}
              />
              <ErrorMessage name="phone" />
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <Button type="submit">Register!</Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default UserRegistrationForm;
