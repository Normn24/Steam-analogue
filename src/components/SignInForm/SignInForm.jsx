import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignInForm.scss";
export default function SignInForm({Modalstate}) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const initialValues ={
    email:'',    
    password:'',
    confirmPassword:'',
    }
    function onSubmit(values){
      Modalstate()
      console.log('submit', values);
      fetch()
    }




  return(

    <Formik initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
>
<Form> 
                <div className="form"> 
                <div className="form_row">
                    <label htmlFor="email">Email</label>
                     <Field type="email" id ='email' name ="email"/>
                     <ErrorMessage name='email' component="div"></ErrorMessage>
                </div>
                
                <div className="form_row">
                    <label htmlFor="password">Password</label>
                     <Field type="password" id ='password' name ="password"/>
                     <ErrorMessage name='password' component="div"></ErrorMessage>
                </div>
                <div className="form_row">
                    <label htmlFor="confirmPassword">confirmPassword</label>
                     <Field type="confirmPassword" id ='password' name ="confirmPassword"/>
                     <ErrorMessage name='confirmPassword' component="div"></ErrorMessage>
                </div>
                <button type="submit">sign in</button>
                </div>
            </Form>
    </Formik>
  )
}
