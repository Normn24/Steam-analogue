import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth.slice/signup.slice"

const validationSchema = Yup.object().shape({
  login: Yup.string().min(4, "Login must be at least 4 characters")
  .max(10, "Login must be maximum 10 characters").required("login is required"),
  firstName: Yup.string().min(2, "FirstName must be at least 4 characters")
  .max(25, "FirstName must be maximum 25 characters").required("firstname is required"),
  lastName: Yup.string().min(2, "LastName must be at least 4 characters")
  .max(25, "LastName must be maximum 25 characters").required("lastname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  login: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegistrationForm({ Modalstate, isSignd, setIsSignd }) {
  const dispatch = useDispatch(); 
  const registrationStatus = useSelector((state) => state.signup.status); 

  const onSubmit = (values) => {
    dispatch(registerUser(values)); 
    console.log('values :>> ', values); 
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="form">
          <div className="form_row">
            <label htmlFor="firstName">FirstName</label>
            <Field type="firstName" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div"></ErrorMessage>
          </div>
          <div className="form_row">
            <label htmlFor="lastName">LastName</label>
            <Field type="lastName" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div"></ErrorMessage>
          </div>
          <div className="form_row">
            <label htmlFor="login">Login</label>
            <Field type="login" id="login" name="login" />
            <ErrorMessage name="login" component="div"></ErrorMessage>
          </div>
          <div className="form_row">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div"></ErrorMessage>
          </div>

          <div className="form_row">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div"></ErrorMessage>
          </div>
          <div className="form_row">
            <label htmlFor="confirmPassword">confirmPassword</label>
            <Field
              type="confirmPassword"
              id="password"
              name="confirmPassword"
            />
            <ErrorMessage name="confirmPassword" component="div"></ErrorMessage>
          </div>
          <button type="submit">sign in</button>
        </div>
      </Form>
    </Formik>
  );
}
