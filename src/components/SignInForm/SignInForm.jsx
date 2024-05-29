import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth.slice/signup.slice";
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
  ErrorMessage,
} from "../../styles/forms/StylesLogInForm";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const validationSchema = Yup.object().shape({
  login: Yup.string()
    .min(4, "Login must be at least 4 characters")
    .max(10, "Login must be maximum 10 characters")
    .required("login is required"),
  firstName: Yup.string()
    .min(2, "FirstName must be at least 2 characters")
    .max(25, "FirstName must be maximum 25 characters")
    .required("firstname is required"),
  lastName: Yup.string()
    .min(2, "LastName must be at least 2 characters")
    .max(25, "LastName must be maximum 25 characters")
    .required("lastname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
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

export default function SignInForm({ onLoginClick }) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.signup);
  console.log(error);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values)).then((response) => {
        if (!response.error) {
          onLoginClick();
        }
      });
    },
  });

  return (
    <>
      <FormContainer>
        <Title>Sign Up</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <InputGroup>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <StyledInput
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
              />
            </InputGroup>
            <InputGroup>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <StyledInput
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
              />
            </InputGroup>
          </Box>
          <InputGroup>
            <InputLabel htmlFor="login">Login</InputLabel>
            <StyledInput
              id="login"
              name="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
              inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="email">Email</InputLabel>
            <StyledInput
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
            />
          </InputGroup>
          <Box sx={{ display: "flex", gap: "20px", marginBottom: "14px" }}>
            <InputGroup>
              <InputLabel htmlFor="password">Password</InputLabel>
              <StyledInput
                id="password"
                name="password"
                type="password"
                autoComplete="on"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
              />
            </InputGroup>
            <InputGroup>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <StyledInput
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="on"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
              />
            </InputGroup>
          </Box>
          {error && (
            <ErrorMessage>{error?.message || "An error occurred"}</ErrorMessage>
          )}
          <SignButton variant="contained" type="submit">
            Sign Up
          </SignButton>
        </Form>
        <SocialMessage>
          <Line />
          <Message>or sign up with</Message>
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
          Already have an account?
          <Link
            onClick={onLoginClick}
            style={{ color: "#ffff", marginLeft: "5px" }}
          >
            Login
          </Link>
        </SignUp>
      </FormContainer>
    </>
  );
}
