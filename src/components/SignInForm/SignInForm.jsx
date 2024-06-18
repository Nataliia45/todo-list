import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './SignInForm.scss';

const SignInSchema = Yup.object().shape({
  login: Yup.string()
    .required('Login is required'),
  password: Yup.string()
    .required('Password is required'),
});

export default function SignInForm({ handleSignIn }) {
  return (
    <div className='SignInForm'>
      <h2>Sign In</h2>
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleSignIn(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <p>
              <Field
                name="login"
                placeholder="Login"
              />
              {errors.login && touched.login ? (
                <div className='error'>{errors.login}</div>
              ) : null}
            </p>
            <p>
              <Field
                name="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className='error'>{errors.password}</div>
              ) : null}
            </p>
            <button type="submit" disabled={isSubmitting}>Sign In</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
