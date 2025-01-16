import { Box } from "@mui/material";
import {
  FormContainer,
  Title,
  SignButton,
} from "../../styles/forms/StylesAuthForm.js";
import { persistor } from "../../redux/store";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/auth.slice/login.slice.js";

export default function Logout({ handleClose }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    persistor.purge();
    dispatch(clearToken());
    window.location.href = "/";
  };

  return (
    <>
      <FormContainer>
        <Title>Are you sure?</Title>
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            mt: "40px",
          }}
        >
          <SignButton onClick={handleClose}>Cancel</SignButton>
          <SignButton onClick={handleLogout}>Logout</SignButton>
        </Box>
      </FormContainer>
    </>
  );
}
