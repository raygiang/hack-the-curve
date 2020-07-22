import * as yup from "yup";

const phoneRegExp = /^(\d){3}\s(\d){3}\s(\d){4}$/;
export const validationSchema = yup.object({
    username: yup.string().required("Please enter your username."),
    firstName: yup.string().required("Please enter your first name."),
    lastName: yup.string().required("Please enter your last name."),
    email: yup
        .string()
        .email("Please enter a valid e-mail.")
        .required("Please enter your e-mail."),
    phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Please enter your phone number."),
    password: yup.string(),
    passwordConfirm: yup.string().when('password', {
        is: val => val && val.length > 0,
        then: yup.string()
            .oneOf([yup.ref("password")], "Both passwords need to match.")
            .required("Both passwords need to match.")
    }),
});
