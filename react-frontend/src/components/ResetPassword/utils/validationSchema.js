import * as yup from "yup";

export const validationSchema = yup.object({
    password: yup.string().required("Password is required"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Sorry your passwords don't match")
        .required("Confirm Password is required"),
});
