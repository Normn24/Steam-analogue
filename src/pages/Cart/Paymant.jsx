import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useStyles } from "./CartItem/styles.js";
import { TextField, Button, Box } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Payment = ({modalClose}) => {
  const classes = useStyles();

  const SignupSchema = Yup.object().shape({
    phone: Yup.string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .matches(/^\+38 \((?!0{3}\))\d{3}\) [1-9]\d{2}-\d{2}-\d{2}$/ )
      .required("Required"),
    email: Yup.string().email("Invalid email"),
  });

  

  return (
    <div>
      <Box className={classes.icon}>
        <h2>Payment</h2>
        <HighlightOffIcon  onClick={modalClose}/>
      </Box>
      <Formik
        initialValues={{ email: "", phone: "" }}
        onSubmit={() => {modalClose(true)}}
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
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
            />
            {errors.email && touched.email && errors.email}
            <TextField
              type="phone"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              margin="normal"
              required
              fullWidth
              label="+38 (067) 123-45-67"
              id="phone"
              autoComplete="current-password"
            />
            {errors.phone && touched.phone && errors.phone}
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
