import { Formik, Field, Form, FormikErrors } from "formik";
import { FormValues } from "../Types";

const FormComponent = ({
  onSubmit,
  validate,
}: {
  onSubmit: (values: FormValues) => void;
  validate: (values: FormValues) => FormikErrors<FormValues>;
}) => (
  <div>
    <h1>Formik component</h1>
    <Formik
      initialValues={{
        name: "",
        email: "",
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({ touched, errors, resetForm }): React.ReactElement => (
        <Form>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" data-testid="name" />
          {touched.name && errors.name && <div>{errors.name}</div>}

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" data-testid="email" />
          {touched.email && errors.email && <div>{errors.email}</div>}

          <button type="submit">Submit</button>
          <button onClick={(): void => resetForm()}>Cancel</button>
        </Form>
      )}
    </Formik>
  </div>
);
export { FormComponent };
