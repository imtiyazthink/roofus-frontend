import * as Yup from "yup";

const TenantFormValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),
  email: Yup.string().email().required("Email Id is required"),
});

export default TenantFormValidation;
