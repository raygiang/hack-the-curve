import * as yup from "yup";

export const validationSchemaLogin = yup.object({
    identifier: yup.string().required("Please enter your username or email address"),
    password: yup.string().required("Password is required"),
});

export const validationSchemaReset = yup.object({
    email: yup.string().email("Please enter a valid email address")
        .required("Please enter your email address"),
});
