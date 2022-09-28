import { Formik, Field, Form, FormikErrors } from "formik";
import { FormValues } from "../Types";

const FormComponent = ({
  onSubmit,
  validate,
}: {
  onSubmit: (values: FormValues) => void;
  validate: (values: FormValues) => FormikErrors<FormValues>;
}) => (
  <section>
    <Formik
      initialValues={{
        name: "",
        email: "",
      }}
      onSubmit={(values) => onSubmit(values)}
      validate={validate}
    >
      {({ touched, errors, resetForm }): React.ReactElement => (
        <Form>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" type="text" data-testid="name" />
          {touched.name && errors.name && <span>{errors.name}</span>}

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" data-testid="email" />
          {touched.email && errors.email && <span>{errors.email}</span>}

          <button type="submit">Submit</button>
          <button onClick={(): void => resetForm()}>Cancel</button>
        </Form>
      )}
    </Formik>
  </section>
);
export { FormComponent };
