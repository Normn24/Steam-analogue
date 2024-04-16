import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignInForm.scss";
export default function SignInForm({ Modalstate,isSignd, setIsSignd }) {
  const validationSchema = Yup.object().shape({
    login: Yup.string().min(4, "login must be at least 4 characters"),
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
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

  function onSubmit(values) {
  
    console.log("submit", values);

    fetch("http://localhost:4000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsSignd(!isSignd);
        Modalstate();
        return response.json(); 
      })
      .then((data) => {
       
        console.log("Response from server:", data);
      })
      .catch((error) => {
       
        console.error("There was a problem with the fetch operation:", error);
      });
  }

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
