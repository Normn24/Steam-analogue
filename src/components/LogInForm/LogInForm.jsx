import * as Yup from "yup";
import { useFormik } from "formik";
import { loginUser } from "../../redux/auth.slice/login.slice";
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
  Forgot,
  Message,
  Icon,
  ErrorMessage,
} from "../../styles/forms/StylesAuthForm.js";
import { Link } from "react-router-dom";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";

const validationSchema = Yup.object().shape({
  loginOrEmail: Yup.string()
    .required("Login or email is required")
    .min(4, "Login or email must be at least 4 characters"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LogInForm({
  onSignUpClick,
  onForgotPasswordClick,
  handleClose,
}) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.login);

  const formik = useFormik({
    initialValues: {
      loginOrEmail: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values)).then((response) => {
        if (response.payload && response.payload.token) {
          handleClose();
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
            <InputLabel htmlFor="loginOrEmail">Login or email</InputLabel>
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
            />
          </InputGroup>
          <PasswordInput
            label="Password"
            formik={formik}
            formikValues="password"
          />

          <Forgot>
            <Link
              onClick={onForgotPasswordClick}
              style={{ color: "#ffff", marginLeft: "5px" }}
            >
              Forgot Password?
            </Link>
            {error && (
              <ErrorMessage>
                {error?.loginOrEmail || error?.password || "An error occurred"}
              </ErrorMessage>
            )}
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
