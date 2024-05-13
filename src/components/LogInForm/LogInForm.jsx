import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LogInForm.scss";

export default function LogInForm({ isModalOpen, setIsModalOpen }) {
  const validationSchema = Yup.object().shape({
    loginOrEmail: Yup.string().min(4, "Login or Email must be at least 4 characters").required("Login or Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const initialValues = {
    loginOrEmail: "",
    password: "",
  };

  function onSubmit(values, { setSubmitting, setErrors }) {
    fetch("http://localhost:4000/api/customers/login", {
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
        return response.json();
      })
      .then((data) => {
        const token = data.token;
        localStorage.setItem("token", token);
        console.log("Response from server:", data);
        setIsModalOpen(isModalOpen);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setErrors({ loginOrEmail: "Invalid login or password", password: "Invalid login or password" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <div className="form">
            <div className="form_row">
              <label htmlFor="loginOrEmail">Login Or Email</label>
              <Field type="text" id="loginOrEmail" name="loginOrEmail" />
              <ErrorMessage name="loginOrEmail" component="div" className="error_message" />
            </div>
            <div className="form_row">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error_message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
