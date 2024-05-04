import {Field, Form, Formik} from "formik";
import * as Yup from 'yup'
const Payment = () => {
    const SignupSchema = Yup.object().shape({
       password: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    return(
        <div>
            <h2>Payment</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(e) => console.log(e)}
                validationSchema={SignupSchema}
            >
                {({ isSubmitting,handleChange, values, errors,touched, handleSubmit, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email && errors.email}
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}
export default Payment