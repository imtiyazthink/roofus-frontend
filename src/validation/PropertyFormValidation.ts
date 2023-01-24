import * as Yup from "yup";

const PropertyFormValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(40, "Name must not exceed 40 characters"),
  address: Yup.string()
    .required("Address is required")
    .min(3, "Address must be at least 3 characters")
    .max(40, "Address must not exceed 40 characters"),
  owner: Yup.string().required("Owner is required"),
});

export default PropertyFormValidation;
