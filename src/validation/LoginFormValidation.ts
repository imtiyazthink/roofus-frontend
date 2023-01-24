import * as Yup from "yup";

const LoginFormValidation = Yup.object().shape({
  email: Yup.string().email().required("Email Id is required"),
  password: Yup.string()
    .required("Password is required"),
});

export default LoginFormValidation;
