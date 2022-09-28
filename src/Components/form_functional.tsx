import { FormikErrors, useFormik } from "formik";
import { FormValues } from "../Types";

const FormFunctional = ({
  onSubmit,
  validate,
}: {
  onSubmit: (values: FormValues) => void;
  validate: (values: FormValues) => FormikErrors<FormValues>;
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        data-testid="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name && (
        <div>{formik.errors.name}</div>
      )}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        data-testid="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email && (
        <div>{formik.errors.email}</div>
      )}

      <button type="submit">Submit</button>
      <button onClick={(): void => formik.resetForm()}>Cancel</button>
    </form>
  );
};

export { FormFunctional };
