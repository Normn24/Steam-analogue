import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useStyles } from "./CartItem/styles.js";
import { TextField, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Payment = ({modalClose}) => {
  const classes = useStyles();

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const validateEmail = (email) => {
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if (email.value === "") {
      setError(email, "Email is required");
    } else if (!regex.test(email.value)) {
      setError(email, "Email is incorrect");
    } else {
      setValid(email);
    }
  };

  return (
    <div>
      <Box className={classes.icon}>
        <h2>Payment</h2>
        <HighlightOffIcon  onClick={modalClose}/>
      </Box>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={() => {modalClose()}}
        validationSchema={SignupSchema}
      >
        {({
          isSubmitting,
          handleChange,
          values,
          errors,
          touched,
          handleSubmit,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
            />
            {errors.email && touched.email && errors.email}
            <TextField
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              margin="normal"
              required
              fullWidth
              label="Password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && touched.password && errors.password}
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Payment;
