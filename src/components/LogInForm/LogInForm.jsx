import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LogInForm.scss";
import { loginUser } from "../../redux/auth.slice/login.slice";
import { useDispatch } from "react-redux";

export default function LogInForm() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    loginOrEmail: Yup.string().min(
      4,
      "loginOrEmail must be at least 4 characters"
    ),
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
    dispatch(loginUser(values));
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
