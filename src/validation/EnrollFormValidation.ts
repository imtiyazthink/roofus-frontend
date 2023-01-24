import * as Yup from "yup";

const EnrollFormValidation = Yup.object().shape({
  openHouse: Yup.string(),
  tenant: Yup.string().required("Tenant is required"),
});

export default EnrollFormValidation;
