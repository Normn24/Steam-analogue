import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FaDiscord, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import { useNavigate } from "react-router-dom";

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
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/auth.slice/forgotPassword.slice.js";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPasswordForm({ onSignUpClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = useParams(); // Extract token from URL

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        resetPassword({ token, newPassword: values.newPassword, navigate })
      ); // Pass token and navigate with new password
    },
  });

  useEffect(() => {
    if (success) {
      navigate("/"); // Redirect to home page on successful password reset
    }
  }, [success, navigate]);

  return (
    <ModalWindow open={true}>
      <FormContainer>
        <Title>Reset Password</Title>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="newPassword">New Password</InputLabel>
            <StyledInput
              id="newPassword"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <StyledInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </InputGroup>
          {loading && <p>Resetting password...</p>}
          {success && <p>Password has been reset successfully!</p>}
          {error && <p>Error: {error}</p>}
          <SignButton variant="contained" type="submit">
            Reset Password
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
          Don’t have an account?
          <Link
            onClick={onSignUpClick}
            style={{ color: "#ffff", marginLeft: "5px" }}
          >
            Sign Up
          </Link>
        </SignUp>
      </FormContainer>
    </ModalWindow>
  );
}
