import { FormikErrors } from "formik";
import { FormValues } from "../Types";

const validate = (values: FormValues) => {
  let errors: FormikErrors<FormValues> = {};

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.name) {
    errors.name = "Name required";
  }

  return errors;
};

export { validate };
