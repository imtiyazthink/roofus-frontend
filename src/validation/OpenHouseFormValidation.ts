import * as Yup from "yup";

const OpenHouseFormValidation = Yup.object().shape({
    property: Yup.string()
    .required("Property is required"),
    visitorAmount: Yup.number()
    .required("Visitor Amount is required").typeError("Vistor Amount is required"),
    startDate: Yup.string()
    .required("Start Date is required"),
});

export default OpenHouseFormValidation;
