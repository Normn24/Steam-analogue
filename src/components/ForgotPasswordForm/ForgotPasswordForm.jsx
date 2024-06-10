import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FaDiscord, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import {
  FormContainer,
  Title,
  Form,
  InputGroup,
  InputLabel,
  StyledInput,
  SocialIcons,
  SignButton,
  SignUp,
  SocialMessage,
  Line,
  Message,
  Icon,
} from "../../styles/forms/StylesAuthForm.js";
import { Link } from "react-router-dom";
import { sendResetPasswordEmail } from "../../redux/auth.slice/forgotPassword.slice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function ForgotPasswordForm({ onSignUpClick }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(sendResetPasswordEmail(values.email));
    },
  });

  return (
    <>
      <FormContainer>
        <Title>Forgot Password</Title>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="email">Email</InputLabel>
            <StyledInput
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </InputGroup>
          {loading && <p>Sending reset password email...</p>}
          {success && <p>Email sent successfully!</p>}
          {error && <p>Error: {error.message || error}</p>}
          <SignButton variant="contained" type="submit">
            Submit
          </SignButton>
        </Form>
        <SocialMessage>
          <Line />
          <Message>or log in with</Message>
          <Line />
        </SocialMessage>
        <SocialIcons>
          <Icon>
            <FaDiscord
              style={{ height: "40px", width: "40px", fill: "#fff" }}
            />
          </Icon>
          <Icon>
            <FaLinkedin
              style={{ height: "40px", width: "40px", fill: "#fff" }}
            />
          </Icon>
          <Icon>
            <FaTwitterSquare
              style={{ height: "40px", width: "40px", fill: "#fff" }}
            />
          </Icon>
        </SocialIcons>
        <SignUp>
          Don`t have an account?
          <Link
            onClick={onSignUpClick}
            style={{ color: "#ffff", marginLeft: "5px" }}
          >
            Sign Up
          </Link>
        </SignUp>
      </FormContainer>
    </>
  );
}
