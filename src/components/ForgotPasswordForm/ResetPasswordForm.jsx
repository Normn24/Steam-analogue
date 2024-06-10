import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ModalWindow from "../ModalWindow/ModalWindow.jsx";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  Title,
  Form,
  SignButton,
} from "../../styles/forms/StylesAuthForm.js";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../redux/auth.slice/forgotPassword.slice.js";
import PasswordInput from "../PasswordInput/PasswordInput.jsx";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const { loading, success, error } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        resetPassword({ token, newPassword: values.newPassword, navigate })
      );
    },
  });

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ModalWindow open={open} handleClose={handleClose}>
      <FormContainer>
        <Title>Reset Password</Title>
        <Form onSubmit={formik.handleSubmit}>
          <PasswordInput
            label="New Password"
            formik={formik}
            formikValues="newPassword"
          />
          <PasswordInput
            label="Confirm Password"
            formik={formik}
            formikValues="confirmPassword"
          />
          {loading && <p>Resetting password...</p>}
          {success && <p>Password has been reset successfully!</p>}
          {error && <p>Error: {error}</p>}
          <SignButton variant="contained" type="submit">
            Reset Password
          </SignButton>
        </Form>
      </FormContainer>
    </ModalWindow>
  );
}
