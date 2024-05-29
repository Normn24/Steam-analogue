import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../../redux/auth.slice/login.slice";
import { useDispatch } from "react-redux";
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
  Forgot,
  Message,
  Icon,
} from "../../styles/forms/StylesLogInForm.js";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  loginOrEmail: Yup.string()
    .required("Email is required")
    .min(4, "Login or email must be at least 4 characters"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LogInForm({ onSignUpClick, onForgotPasswordClick }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      loginOrEmail: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("submit", values);
      dispatch(loginUser(values)).then((response) => {
        if (response.payload) {
          if (localStorage.getItem("token")) {
            window.location.href = "/";
          }
        }
      });
    },
  });

  return (
    <>
      <FormContainer>
        <Title>Login</Title>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <InputLabel htmlFor="loginOrEmail">Email</InputLabel>
            <StyledInput
              id="loginOrEmail"
              name="loginOrEmail"
              value={formik.values.loginOrEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.loginOrEmail &&
                Boolean(formik.errors.loginOrEmail)
              }
              helperText={
                formik.touched.loginOrEmail && formik.errors.loginOrEmail
              }
              inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <StyledInput
              id="password"
              name="password"
              type="password"
              autoComplete="on"
              inputProps={{ style: { color: "rgba(243, 244, 246, 1)" } }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </InputGroup>
          <Forgot>
            <Link
              onClick={onForgotPasswordClick}
              style={{ color: "#ffff", marginLeft: "5px" }}
            >
              Forgot Password?
            </Link>
          </Forgot>
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
