import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import './SignUpForm.scss';

const SignUpSchema = Yup.object().shape({
  login: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Nice try, nobody has a login that long')
    .required('Login is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(10, 'Not longer than 10 characters')
    .required('Password is required'),
});

export default function SignUpForm({ handleSignUp }) { // Зміна тут: деструктуризація
  return (
    <div className='SignUpForm'>
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          handleSignUp(values);
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
            <button type="submit" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
