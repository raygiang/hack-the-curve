import * as yup from "yup";

const phoneRegExp = /^(\d){3}\s(\d){3}\s(\d){4}$/;
export const validationSchema = yup.object({
  username: yup.string().required("Please enter your preferred username."),
  firstName: yup.string().required("Please enter your first name."),
  lastName: yup.string().required("Please enter your last name."),
  email: yup
    .string()
    .email("Please enter a valid e-mail")
    .required("Please enter your e-mail."),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Please enter your phone number."),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password is required"),
});
