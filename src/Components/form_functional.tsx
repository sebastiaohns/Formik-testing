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
    onSubmit: (values) => onSubmit(values),
    validate,
  });

  return (
    <section>
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
          <span>{formik.errors.name}</span>
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
          <span>{formik.errors.email}</span>
        )}

        <button type="submit">Submit</button>
        <button onClick={(): void => formik.resetForm()}>Cancel</button>
      </form>
    </section>
  );
};

export { FormFunctional };
