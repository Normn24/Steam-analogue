import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LogInForm.scss";
export default function LogInForm({ Modalstate }) {
  const validationSchema = Yup.object().shape({
    loginOrEmail: Yup.string().min(4, "loginOrEmail must be at least 4 characters"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const initialValues = {
    loginOrEmail: "",
    password: "",
  };

  function onSubmit(values) {
    console.log("submit", values);

    
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
        console.log('response :>> ', response.body.token);
        
        Modalstate();
        return response.json(); 
      })
      .then((data) => {
        const token = data.token;
        localStorage.setItem('token', token);
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
            <label htmlFor="loginOrEmail">Login Or Email</label>
            <Field type="loginOrEmail" id="loginOrEmail" name="loginOrEmail" />
            <ErrorMessage name="loginOrEmail" component="div"></ErrorMessage>
          </div>
          <div className="form_row">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div"></ErrorMessage>
          </div>
          <button type="submit">Log in</button>
        </div>
      </Form>
    </Formik>
  );
}
